import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class TypeormEntityBase {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({
    type: "timestamptz",
    update: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updatedAt!: Date;
}
