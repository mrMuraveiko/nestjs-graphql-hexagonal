import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import { CorsConfig, NestConfig, SwaggerConfig } from "@config";
import { AppModule } from "./app.module";

const signalsNames: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGHUP"];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
  });

  const logger = app.get(Logger);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>("nest");
  const corsConfig = configService.get<CorsConfig>("cors");
  const swaggerConfig = configService.get<SwaggerConfig>("swagger");

  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  if (corsConfig.enabled) {
    app.enableCors();
  }

  signalsNames.forEach((signalName) =>
    process.on(signalName, (signal) => {
      logger.log(`Retrieved signal: ${signal}, application terminated`);
      process.exit(0);
    }),
  );

  process.on("uncaughtException", (error: Error) => {
    logger.error({ err: error });
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Promise Rejection, reason: ${reason}`);
    promise.catch((err: Error) => {
      logger.error({ err });
      process.exit(1);
    });
  });

  app.disable("x-powered-by");

  const PORT = process.env.PORT || nestConfig.port;

  await app.listen(PORT, () => {
    logger.debug(`Server started: ${PORT}`);
  });
}

bootstrap();
