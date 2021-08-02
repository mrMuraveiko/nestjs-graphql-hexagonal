import { ID } from "@core/value-object/id.value-object";
import { ConflictException } from "@core/exceptions";
import { AccountEntity } from "@domain/account/entities/account.entity";
import { AccountRepositoryPort } from "../../persistence/account.repository.port";
import { CreateAccountCommand } from "./create-account.command";

export class CreateAccountService {
  constructor(private readonly accountRepository: AccountRepositoryPort) {}

  async createAccount(command: CreateAccountCommand): Promise<ID> {
    if (await this.accountRepository.exists(command.email.value)) {
      throw new ConflictException("Account already exists");
    }

    const account = new AccountEntity(command);

    const created = await this.accountRepository.save(account);

    return created.id;
  }
}
