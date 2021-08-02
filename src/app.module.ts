import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "nestjs-pino";
import { NestEventModule } from "nest-event";
import { AccountRepository } from "@module/account/persistence/account.repository";
import { AccountOrmEntity } from "@module/account/persistence/account.orm-entity";
import { AuthModule } from "@resolver/auth/auth.module";
import { AccountModule } from "@resolver/account/account.module";
import { EmailScalar } from "@resolver/scalars/email";

import config, { GraphqlConfig } from "@config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => config] }),
    LoggerModule.forRoot({ pinoHttp: { prettyPrint: true } }),
    TypeOrmModule.forRoot(config.typeorm),
    TypeOrmModule.forFeature([AccountOrmEntity]),
    NestEventModule,
    AccountModule,
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>("graphql");

        return {
          installSubscriptionHandlers: true,
          buildSchemaOptions: {
            numberScalarMode: "integer",
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: graphqlConfig.schemaDestination,
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
    // AuthModule,
  ],
  controllers: [],
  providers: [AccountRepository, EmailScalar],
})
export class AppModule {}
