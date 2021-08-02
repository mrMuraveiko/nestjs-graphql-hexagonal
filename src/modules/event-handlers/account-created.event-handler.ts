import { EmailService } from "@module/email/email.service";
import { AccountCreatedDomainEvent } from "@module/account/domain/events/account-created.event";
import { DomainEventHandler, DomainEvents } from "@core/domain-event";

export class OnAccountCreatedDomainEvent implements DomainEventHandler {
  constructor(private readonly email: EmailService) {}

  public listen(): void {
    DomainEvents.subscribe(
      AccountCreatedDomainEvent,
      this.onAccountCreated.bind(this),
    );
  }

  async onAccountCreated(event: AccountCreatedDomainEvent): Promise<void> {
    await this.email.send(event.email, "Welcome message goes here");
  }
}
