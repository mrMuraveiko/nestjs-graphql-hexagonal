import { InputType, Field } from "@nestjs/graphql";
import { Length } from "class-validator";
import { EmailScalar } from "@resolver/scalars/email";

import { AccountUpdateInput } from "@types";

@InputType("AccountUpdateInput")
export class AccountUpdateDTO implements AccountUpdateInput {
  @Field(() => EmailScalar, { nullable: false })
  @Length(5, 255)
  email: string;
}
