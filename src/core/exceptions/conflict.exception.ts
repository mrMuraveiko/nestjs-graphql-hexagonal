import { ExceptionBase } from "../base/exception.base";
import { Exceptions } from "../types/exception.type";

export class ConflictException extends ExceptionBase {
  readonly name = Exceptions.conflict;
}
