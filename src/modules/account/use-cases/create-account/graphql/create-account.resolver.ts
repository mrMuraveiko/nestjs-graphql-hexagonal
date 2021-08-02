import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from "@nestjs/graphql";
import { AccountResolver } from "@module/account/dto/account.resolver.dto";
import { AccountEntity } from "@infrastructure/adapters/interfaces/account/account.gql.entity";
import { CreateAccountCommand } from "../create-account.command";
import { CreateAccountService } from "../create-account.service";

export class CreateAccountResolver {
  constructor(private readonly createAccountService: CreateAccountService) {}

  @Mutation(() => AccountResolver)
  async createAccount(
    @AccountEntity() account: AccountResolver,
  ): Promise<AccountResolver> {
    // const command = new CreateAccountCommand({
    //   email: body.email,
    // });

    return account;
  }
}
