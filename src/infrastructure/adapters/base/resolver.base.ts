import { Field, ObjectType, ID } from "@nestjs/graphql";
import { BaseEntityProps } from "@core/base/entity.base";
import { IdResolver } from "../dto/id.resolver.dto";

@ObjectType({ isAbstract: true })
export abstract class ResolverBase extends IdResolver {
  constructor(entity: BaseEntityProps) {
    super(entity.id?.value);

    this.createdAt = entity.createdAt?.value.getTime();
    this.updatedAt = entity.updatedAt?.value.getTime();
  }

  @Field({
    description: "Identifies the date and time when the object was created.",
  })
  createdAt!: number;

  @Field({
    description:
      "Identifies the date and time when the object was last updated.",
  })
  updatedAt!: number;
}
