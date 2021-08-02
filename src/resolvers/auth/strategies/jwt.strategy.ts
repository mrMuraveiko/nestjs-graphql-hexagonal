import { PinoLogger } from "nestjs-pino";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "@service/auth.service";
import { Account } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_ACCESS_SECRET"),
    });

    logger.setContext(JwtStrategy.name);
  }

  async validate(payload: { accountId: string }): Promise<Account> {
    console.log("validate payload", payload);

    const account = await this.authService.validateAccount(payload.accountId);

    if (!account) {
      throw new UnauthorizedException();
    }

    return account;
  }
}
