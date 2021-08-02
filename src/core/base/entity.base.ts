import { DATE } from "../value-object/date.value-object";
import { ID } from "../value-object/id.value-object";

export interface BaseEntityProps {
  id: ID;
  createdAt: DATE;
  updatedAt: DATE;
}

export abstract class Entity<EntityProps> {
  constructor(props: EntityProps) {
    this._id = ID.generate();

    const now = DATE.now();

    this._createdAt = now;
    this._updatedAt = now;

    this.props = props;
  }

  protected readonly props: EntityProps;

  private readonly _id: ID;

  private readonly _createdAt: DATE;

  private _updatedAt: DATE;

  get id(): ID {
    return this._id;
  }

  get createdAt(): DATE {
    return this._createdAt;
  }

  get updatedAt(): DATE {
    return this._updatedAt;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id.equals(object.id) : false;
  }

  public getPropsCopy(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };

    return Object.freeze(propsCopy);
  }
}
