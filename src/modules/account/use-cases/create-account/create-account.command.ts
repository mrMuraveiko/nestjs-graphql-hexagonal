import { Email } from "@domain/account/value-objects/email.value-object";

export interface CreateAccountProps {
  email: string;
}

export class CreateAccountCommand {
  constructor(props: CreateAccountProps) {
    this.email = new Email(props.email);
  }

  readonly email: Email;
}
