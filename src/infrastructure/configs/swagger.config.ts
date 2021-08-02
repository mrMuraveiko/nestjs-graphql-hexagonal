export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export const swaggerConfig: SwaggerConfig = {
  enabled: true,
  title: "Nestjs FTW",
  description: "The nestjs API description",
  version: "1.5",
  path: "api",
};
