import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from "@nestjs/graphql";
import { Auth } from "@model/auth.model";
import { Token } from "@model/token.model";
import { Account } from "@model/account.model";
import { AuthService } from "@service/auth.service";
import { SignupDTO } from "./dto/signup.dto";
import { SigninDTO } from "./dto/signin.dto";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args("payload") data: SignupDTO): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    data.email = data.email.trim().toLowerCase();

    const { accessToken, refreshToken } = await this.auth.createAccount(data);

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async signin(@Args("payload") { email, password }: SigninDTO): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { accessToken, refreshToken } = await this.auth.login(
      email.trim().toLowerCase(),
      password,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Token)
  async refreshToken(@Args("token") token: string) {
    return this.auth.refreshToken(token);
  }

  @ResolveField(() => Account)
  async account(@Parent() auth: Auth) {
    return this.auth.getAccountFromToken(auth.accessToken);
  }
}
