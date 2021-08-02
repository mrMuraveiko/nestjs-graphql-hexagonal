import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountOrmEntity } from "./persistence/account.orm-entity";
import { AccountRepository } from "./persistence/account.repository";
import {
  CreateAccountHttpController,
  CreateAccountResolver,
} from "./use-cases/create-account/create-account.controllers";
import { FindAccountByEmailHttpController } from "./use-cases/find-account-by-email/find-account-by-email.controllers";
import { createAccountProvider } from "./account.providers";

@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity])],
  controllers: [CreateAccountHttpController, FindAccountByEmailHttpController],
  providers: [AccountRepository, createAccountProvider, CreateAccountResolver],
})
export class AccountModule {}
