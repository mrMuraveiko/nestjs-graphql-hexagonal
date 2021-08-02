import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Id } from "../interfaces/id.interface";

@ObjectType({ isAbstract: true })
export abstract class IdResolver implements Id {
  constructor(id: string) {
    this.id = id;
  }

  @Field(() => ID)
  id!: string;
}
