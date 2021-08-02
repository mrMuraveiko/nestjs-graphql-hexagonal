import { Body, Controller, HttpStatus, Inject, Post } from "@nestjs/common";
import { IdResponse } from "@infrastructure/adapters/dto/id.response.dto";
import { routes } from "@config/app.routes";
import { createAccountSymbol } from "@module/account/account.providers";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateAccountCommand } from "../create-account.command";
import { CreateAccountService } from "../create-account.service";
import { CreateAccountRequest } from "./create-account.request.dto";

@Controller()
export class CreateAccountHttpController {
  constructor(
    @Inject(createAccountSymbol)
    private readonly createAccountService: CreateAccountService,
  ) {}

  @Post(routes.account.root)
  @ApiOperation({ summary: "Create an account" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Account already exists",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() body: CreateAccountRequest): Promise<IdResponse> {
    const command = new CreateAccountCommand({
      email: body.email,
    });

    const id = await this.createAccountService.createAccount(command);

    return new IdResponse(id.value);
  }
}
