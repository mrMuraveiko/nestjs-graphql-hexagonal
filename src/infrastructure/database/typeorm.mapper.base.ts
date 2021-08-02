import { BaseEntityProps } from "@core/base/entity.base";
import { DATE } from "@core/value-object/date.value-object";
import { ID } from "@core/value-object/id.value-object";
import { TypeormEntityBase } from "./typeorm.entity.base";

export type OrmEntityProps<OrmEntity> = Omit<
  OrmEntity,
  "id" | "createdAt" | "updatedAt"
>;

export abstract class OrmMapper<Entity extends BaseEntityProps, OrmEntity> {
  constructor(
    private entityConstructor: new (...args: any[]) => Entity,
    private ormEntityConstructor: new (...args: any[]) => OrmEntity,
  ) {}

  protected abstract toDomainProps(ormEntity: OrmEntity): unknown;

  protected abstract toOrmProps(entity: Entity): OrmEntityProps<OrmEntity>;

  toDomainEntity(ormEntity: OrmEntity): Entity {
    const props = this.toDomainProps(ormEntity);
    return this.assignPropsToEntity(props, ormEntity);
  }

  toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);
    return new this.ormEntityConstructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt.value,
    });
  }

  private assignPropsToEntity<Props>(
    entityProps: Props,
    ormEntity: OrmEntity,
  ): Entity {
    const entityCopy: any = Object.create(this.entityConstructor.prototype);
    const ormEntityBase: TypeormEntityBase =
      ormEntity as unknown as TypeormEntityBase;

    entityCopy.props = entityProps;
    entityCopy._id = new ID(ormEntityBase.id);
    entityCopy._createdAt = new DATE(ormEntityBase.createdAt);
    entityCopy._updatedAt = new DATE(ormEntityBase.updatedAt);

    return entityCopy as unknown as Entity;
  }
}
