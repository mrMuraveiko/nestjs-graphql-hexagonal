export type Primitives = string | number | boolean;

export interface DomainPrimitive<T extends Primitives | Date> {
  value: T;
}

type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.props = props;
  }

  public equals(value?: ValueObject<T>): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    return JSON.stringify(this) === JSON.stringify(value);
  }
}
