import { ApplicationError } from "../../shared/ApplicationError.js";

export class CustomerNotFoundError extends ApplicationError {
  public readonly customerId: string;

  public constructor(customerId: string) {
    super(`Customer '${customerId}' was not found.`);
    this.customerId = customerId;
  }
}
