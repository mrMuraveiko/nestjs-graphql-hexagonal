import { Body, Controller, Get } from "@nestjs/common";
import { routes } from "@config/app.routes";
import { AccountResponse } from "@module/account/dto/account.response.dto";
import { AccountRepository } from "@module/account/persistence/account.repository";
import { FindAccountByEmailRequest } from "./find-account-by-email.request.dto";

@Controller()
export class FindAccountByEmailHttpController {
  constructor(private readonly accountRepository: AccountRepository) {}

  @Get(routes.account.root)
  async findByEmail(
    @Body() { email }: FindAccountByEmailRequest,
  ): Promise<AccountResponse> {
    const account = await this.accountRepository.findOneByEmailOrThrow(email);

    return new AccountResponse(account);
  }
}
