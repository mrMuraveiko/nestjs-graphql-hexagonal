import { CreateAccount } from "@infrastructure/adapters/interfaces/account/create-account.interface";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength } from "class-validator";

export class CreateAccountRequest implements CreateAccount {
  @ApiProperty({
    example: "john@gmail.com",
    description: "User email address",
  })
  @MaxLength(320)
  @IsEmail()
  email!: string;
}
