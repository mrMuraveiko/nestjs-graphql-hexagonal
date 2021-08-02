import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from "@config/config.interface";
import { PrismaService } from "@service/prisma.service";
import { PasswordService } from "@service/password.service";
import { Prisma, Account } from "@prisma/client";
import { Token } from "@model/token.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async createAccount(payload: {
    password: string;
    email: string;
  }): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const account = await this.prisma.account.create({
        data: {
          ...payload,
          password: hashedPassword,
        },
      });

      return this.generateTokens({
        accountId: account.id,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const account = await this.prisma.account.findUnique({ where: { email } });

    if (!account) {
      throw new NotFoundException(`No account found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      account.password,
    );

    if (!passwordValid) {
      throw new BadRequestException("Invalid password");
    }

    return this.generateTokens({
      accountId: account.id,
    });
  }

  validateAccount(accountId: string): Promise<Account> {
    return this.prisma.account.findUnique({ where: { id: accountId } });
  }

  getAccountFromToken(token: string): Promise<Account> {
    const id = this.jwtService.decode(token)["accountId"];
    return this.prisma.account.findUnique({ where: { id } });
  }

  generateTokens(payload: { accountId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { accountId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { accountId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>("security");
    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_REFRESH_SECRET"),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { accountId } = this.jwtService.verify(token, {
        secret: this.configService.get("JWT_REFRESH_SECRET"),
      });

      return this.generateTokens({
        accountId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
