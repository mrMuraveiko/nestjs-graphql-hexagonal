import { EmailService } from "@module/email/email.service";
import { DomainEventHandler } from "@core/domain-event";
import { OnAccountCreatedDomainEvent } from "./account-created.event-handler";

const domainEventHandlers: DomainEventHandler[] = [
  new OnAccountCreatedDomainEvent(new EmailService()),
];

export function initDomainEventHandlers(): void {
  domainEventHandlers.forEach((eventHandler: DomainEventHandler) =>
    eventHandler.listen(),
  );
}
