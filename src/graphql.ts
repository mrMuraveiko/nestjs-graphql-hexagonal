
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class AccountUpdateInput {
    email: Email;
}

export class SigninInput {
    email: Email;
    password: string;
}

export class SignupInput {
    email: Email;
    password: string;
}

export class Account {
    createdAt: DateTime;
    email: string;
    id: string;
    updatedAt: DateTime;
}

export class Auth {
    accessToken: string;
    account: Account;
    refreshToken: string;
}

export abstract class IMutation {
    abstract accountUpdate(payload: AccountUpdateInput): Account | Promise<Account>;

    abstract refreshToken(token: string): Token | Promise<Token>;

    abstract signin(payload: SigninInput): Auth | Promise<Auth>;

    abstract signup(payload: SignupInput): Auth | Promise<Auth>;
}

export abstract class IQuery {
    abstract me(): Account | Promise<Account>;
}

export class Token {
    accessToken: string;
    refreshToken: string;
}

export type DateTime = any;
export type Email = any;
type Nullable<T> = T | null;
