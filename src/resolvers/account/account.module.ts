import { Module } from "@nestjs/common";
import { AccountResolver } from "./account.resolver";
import { AccountService } from "@service/account.service";
import { PasswordService } from "@service/password.service";

@Module({
  imports: [],
  providers: [AccountResolver, AccountService, PasswordService],
})
class AccountModule {}

export { AccountModule };
