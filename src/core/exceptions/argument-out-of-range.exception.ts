import { ExceptionBase } from "@core/base/exception.base";
import { Exceptions } from "../types/exception.type";

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly name = Exceptions.argumentOutOfRange;
}
