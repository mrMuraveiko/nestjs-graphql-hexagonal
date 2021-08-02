import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityProps } from "@core/base/entity.base";
import { IdResponse } from "../dto/id.response.dto";

export class ResponseBase extends IdResponse {
  constructor(entity: BaseEntityProps) {
    super(entity.id?.value);

    this.createdAt = entity.createdAt?.value.getTime();
    this.updatedAt = entity.updatedAt?.value.getTime();
  }

  @ApiProperty({ example: "2020-11-24T17:43:15.970Z" })
  createdAt: number;

  @ApiProperty({ example: "2020-11-24T17:43:15.970Z" })
  updatedAt: number;
}
