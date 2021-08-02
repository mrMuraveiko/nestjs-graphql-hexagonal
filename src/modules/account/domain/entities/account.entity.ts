import { AggregateRoot } from "@core/base/aggregate-root.base";
import { Email } from "../value-objects/email.value-object";
import { AccountCreatedDomainEvent } from "../events/account-created.event";

export interface AccountProps {
  email: Email;
}

export class AccountEntity extends AggregateRoot<AccountProps> {
  constructor(props: AccountProps) {
    super(props);
    this.addEvent(new AccountCreatedDomainEvent(this.id, this.props.email));
  }

  get email(): Email {
    return this.props.email;
  }
}
