import { DomainError } from "../../shared/errors/DomainError.js";
import type { CustomerStatus } from "../entities/Customer.js";

export class CustomerSegmentChangeNotAllowedError extends DomainError {
  public constructor(status: CustomerStatus) {
    super(`Customer segment cannot be changed from status ${status}.`);
  }
}
