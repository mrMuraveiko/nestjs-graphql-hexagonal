export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export const securityConfig: SecurityConfig = {
  expiresIn: "2m",
  refreshIn: "7d",
  bcryptSaltOrRound: 10,
};
