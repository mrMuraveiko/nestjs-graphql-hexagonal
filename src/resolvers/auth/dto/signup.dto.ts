import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailScalar } from "@resolver/scalars/email";

import { SignupInput } from "@types";

@InputType("SignupInput")
export class SignupDTO implements SignupInput {
  @Field(() => EmailScalar, { nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
