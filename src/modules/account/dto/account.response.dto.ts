import { ApiProperty } from "@nestjs/swagger";
import { AccountEntity } from "@module/account/domain/entities/account.entity";
import { ResponseBase } from "@infrastructure/adapters/base/response.base";
import { Account } from "@infrastructure/adapters/interfaces/account/account.interface";

export class AccountResponse extends ResponseBase implements Account {
  constructor(user: AccountEntity) {
    super(user);
    this.email = user.email.value;
  }

  @ApiProperty({
    example: "joh-doe@gmail.com",
    description: "Account's email address",
  })
  email: string;
}
