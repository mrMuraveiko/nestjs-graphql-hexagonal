import { PrismaService } from "@service/prisma.service";
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { AccountEntity } from "@decorator/account.decorator";
import { GqlAuthGuard } from "@guard/gql-auth.guard";
import { Account } from "@model/account.model";
import { AccountService } from "@service/account.service";
import { AccountUpdateDTO } from "./dto/accountUpdate.dto";

@Resolver(() => Account)
@UseGuards(GqlAuthGuard)
export class AccountResolver {
  constructor(
    private readonly accountService: AccountService,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Account)
  async me(@AccountEntity() account: Account): Promise<Account> {
    console.log("account:me", account);
    return account;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Account)
  async accountUpdate(
    @AccountEntity() account: Account,
    @Args("payload") payload: AccountUpdateDTO,
  ): Promise<Account> {
    return this.accountService.updateAccount(account.id, payload);
  }
}
