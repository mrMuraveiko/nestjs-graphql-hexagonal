import { DATE } from "../value-object/date.value-object";
import { ID } from "../value-object/id.value-object";

export abstract class DomainEvent {
  public abstract readonly aggregateId: ID;

  public readonly dateOccurred = DATE.now();
}
