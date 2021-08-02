import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailScalar } from "@resolver/scalars/email";

import { SigninInput } from "@types";

@InputType("SigninInput")
export class SigninDTO implements SigninInput {
  @Field(() => EmailScalar, { nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
