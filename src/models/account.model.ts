import { ObjectType, HideField, Field } from "@nestjs/graphql";
import { BaseModel } from "./base.model";

@ObjectType()
export class Account extends BaseModel {
  @Field()
  email: string;

  @HideField()
  password: string;
}
