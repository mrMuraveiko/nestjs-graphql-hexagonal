import { v4 } from "uuid";
import { ValueObject } from "@core/base/value-object.base";

export class ID extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }

  static generate(): ID {
    return new ID(v4());
  }
}
