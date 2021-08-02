import { Provider } from "@nestjs/common";
import { AccountRepository } from "./persistence/account.repository";
import { CreateAccountService } from "./use-cases/create-account/create-account.service";

export const createAccountSymbol = Symbol("createAccount");

export const createAccountProvider: Provider = {
  provide: createAccountSymbol,
  useFactory: (accountRepository: AccountRepository): CreateAccountService => {
    return new CreateAccountService(accountRepository);
  },
  inject: [AccountRepository],
};
