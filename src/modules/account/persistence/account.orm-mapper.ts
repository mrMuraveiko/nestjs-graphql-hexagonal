import {
  OrmEntityProps,
  OrmMapper,
} from "@infrastructure/database/typeorm.mapper.base";
import {
  AccountEntity,
  AccountProps,
} from "@domain/account/entities/account.entity";
import { Email } from "@domain/account/value-objects/email.value-object";
import { AccountOrmEntity } from "./account.orm-entity";

export class AccountOrmMapper extends OrmMapper<
  AccountEntity,
  AccountOrmEntity
> {
  protected toOrmProps(
    entity: AccountEntity,
  ): OrmEntityProps<AccountOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<AccountOrmEntity> = {
      email: props.email.value,
    };

    return ormProps;
  }

  protected toDomainProps(ormEntity: AccountOrmEntity): AccountProps {
    const props: AccountProps = {
      email: new Email(ormEntity.email),
    };

    return props;
  }
}
