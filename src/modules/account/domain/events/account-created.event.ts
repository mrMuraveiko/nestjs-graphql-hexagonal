import { DomainEvent } from "@core/base/domain-event.base";
import { ID } from "@core/value-object/id.value-object";
import { Email } from "../value-objects/email.value-object";

export class AccountCreatedDomainEvent extends DomainEvent {
  constructor(public readonly aggregateId: ID, public readonly email: Email) {
    super();
  }
}
