import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

// config();

export type TypeormConfig = TypeOrmModuleOptions;

export const typeormConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  autoLoadEntities: true,
  logging: "all", //["error", "migration", "schema"],
};
