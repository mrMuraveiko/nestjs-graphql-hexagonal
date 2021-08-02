import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsEmail } from "class-validator";
import { FindAccountByEmail } from "@infrastructure/adapters/interfaces/account/find-account-by-email.interface";

export class FindAccountByEmailRequest implements FindAccountByEmail {
  @ApiProperty({
    example: "john@gmail.com",
    description: "Account email address",
    required: true,
  })
  @MaxLength(320)
  @IsEmail()
  email!: string;
}
