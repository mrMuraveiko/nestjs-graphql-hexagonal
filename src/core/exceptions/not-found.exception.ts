import { ExceptionBase } from "@core/base/exception.base";
import { Exceptions } from "../types/exception.type";

export class NotFoundException extends ExceptionBase {
  constructor(readonly message: string = "Not found") {
    super(message);
  }

  readonly name = Exceptions.notFound;
}
