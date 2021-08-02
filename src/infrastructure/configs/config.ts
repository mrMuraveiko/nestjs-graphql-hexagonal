import { corsConfig, CorsConfig } from "./cors.config";
import { graphqlConfig, GraphqlConfig } from "./graphql.config";
import { nestConfig, NestConfig } from "./nest.config";
import { securityConfig, SecurityConfig } from "./security.config";
import { swaggerConfig, SwaggerConfig } from "./swagger.config";
import { typeormConfig, TypeormConfig } from "./typeorm.config";

const config = {
  nest: nestConfig,
  cors: corsConfig,
  swagger: swaggerConfig,
  graphql: graphqlConfig,
  security: securityConfig,
  typeorm: typeormConfig,
};

export default config;

export {
  CorsConfig,
  GraphqlConfig,
  NestConfig,
  SecurityConfig,
  SwaggerConfig,
  TypeormConfig,
};
