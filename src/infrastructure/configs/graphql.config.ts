export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export const graphqlConfig: GraphqlConfig = {
  playgroundEnabled: true,
  debug: true,
  schemaDestination: "./src/schema.graphql",
  sortSchema: true,
};
