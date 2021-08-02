import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import {
  AccountEntity,
  AccountProps,
} from "@domain/account/entities/account.entity";
import { NotFoundException } from "@core/exceptions";
import {
  TypeormRepositoryBase,
  WhereCondition,
} from "@infrastructure/database/typeorm.repository.base";
import { QueryParams } from "@core/persistence/repository";
import { AccountOrmEntity } from "./account.orm-entity";
import { AccountRepositoryPort } from "./account.repository.port";
import { AccountOrmMapper } from "./account.orm-mapper";

@Injectable()
export class AccountRepository
  extends TypeormRepositoryBase<AccountEntity, AccountProps, AccountOrmEntity>
  implements AccountRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly accountRepository: Repository<AccountOrmEntity>,
  ) {
    super(
      accountRepository,
      new AccountOrmMapper(AccountEntity, AccountOrmEntity),
    );
  }

  private async findOneByEmail(
    email: string,
  ): Promise<AccountOrmEntity | undefined> {
    const account = await this.accountRepository.findOne({
      where: { email },
    });

    return account;
  }

  async findOneByEmailOrThrow(email: string): Promise<AccountEntity> {
    const account = await this.findOneByEmail(email);

    if (!account) {
      throw new NotFoundException();
    }

    return this.mapper.toDomainEntity(account);
  }

  async exists(email: string): Promise<boolean> {
    const found = await this.findOneByEmail(email);

    if (found) {
      return true;
    }

    return false;
  }

  protected prepareQuery(
    params: QueryParams<AccountProps>,
  ): WhereCondition<AccountOrmEntity> {
    const where: QueryParams<AccountOrmEntity> = {};

    if (params.id) {
      where.id = params.id.value;
    }

    return where;
  }
}
