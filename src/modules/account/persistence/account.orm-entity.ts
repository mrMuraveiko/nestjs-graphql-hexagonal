import { Column, Entity } from "typeorm";
import { TypeormEntityBase } from "@infrastructure/database/typeorm.entity.base";

@Entity("Account", {})
export class AccountOrmEntity extends TypeormEntityBase {
  constructor(props?: AccountOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  email!: string;
}
