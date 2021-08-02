import { ObjectType, HideField, Field } from "@nestjs/graphql";
import { AccountEntity } from "@module/account/domain/entities/account.entity";
import { ResolverBase } from "@infrastructure/adapters/base/resolver.base";
import { Account } from "@infrastructure/adapters/interfaces/account/account.interface";

@ObjectType()
export class AccountResolver extends ResolverBase implements Account {
  constructor(account: AccountEntity) {
    super(account);

    this.email = account.email.value;
  }

  @Field()
  email: string;

  @HideField()
  password: string;
}
