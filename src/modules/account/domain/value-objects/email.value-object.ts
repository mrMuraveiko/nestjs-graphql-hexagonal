import { DomainPrimitive, ValueObject } from "@core/base/value-object.base";
import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from "@core/exceptions";
import { Guard } from "@core/guard";

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = Email.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 5, 320)) {
      throw new ArgumentOutOfRangeException("Email");
    }
    if (!value.includes("@")) {
      throw new ArgumentInvalidException("Email has incorrect format");
    }
  }

  static format(email: string): string {
    return email.trim().toLowerCase();
  }
}
