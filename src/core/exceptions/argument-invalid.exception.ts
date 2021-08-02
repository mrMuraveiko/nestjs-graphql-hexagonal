import { ExceptionBase } from "@core/base/exception.base";
import { Exceptions } from "../types/exception.type";

export class ArgumentInvalidException extends ExceptionBase {
  readonly name = Exceptions.argumentInvalid;
}
