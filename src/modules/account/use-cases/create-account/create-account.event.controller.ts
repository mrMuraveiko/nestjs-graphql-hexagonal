import { createAccountSymbol } from "../../account.providers";
import { Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { IdResponse } from "@infrastructure/adapters/dto/id.response.dto";
import { CreateAccount } from "@infrastructure/adapters/interfaces/account/create-account.interface";
import { CreateAccountCommand } from "./create-account.command";
import { CreateAccountService } from "./create-account.service";

export class CreateUserEventController {
  constructor(
    @Inject(createAccountSymbol)
    private readonly createAccountService: CreateAccountService,
  ) {}

  @MessagePattern("account.create")
  async create(payload: CreateAccount): Promise<IdResponse> {
    const command = new CreateAccountCommand({
      email: payload.email,
    });

    const id = await this.createAccountService.createAccount(command);

    return new IdResponse(id.value);
  }
}
