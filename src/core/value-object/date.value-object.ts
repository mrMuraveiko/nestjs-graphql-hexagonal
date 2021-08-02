import { ValueObject } from "@core/base/value-object.base";

export class DATE extends ValueObject<Date> {
  constructor(value: Date | string | number) {
    const date = new Date(value);
    super({ value: date });
  }

  public get value(): Date {
    return this.props.value;
  }

  public static now(): DATE {
    return new DATE(Date.now());
  }
}
