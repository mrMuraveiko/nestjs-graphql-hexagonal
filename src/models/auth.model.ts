import { ObjectType } from "@nestjs/graphql";
import { Account } from "./account.model";
import { Token } from "./token.model";

@ObjectType()
export class Auth extends Token {
  account: Account;
}
