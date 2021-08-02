import { RepositoryPort } from "@core/persistence/repository";
import {
  AccountEntity,
  AccountProps,
} from "@domain/account/entities/account.entity";

export interface AccountRepositoryPort
  extends RepositoryPort<AccountEntity, AccountProps> {
  findOneByEmailOrThrow(email: string): Promise<AccountEntity>;
  exists(email: string): Promise<boolean>;
}
