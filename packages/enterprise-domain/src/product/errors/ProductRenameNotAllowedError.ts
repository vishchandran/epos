import { DomainError } from "../../shared/errors/DomainError.js";

export class ProductRenameNotAllowedError extends DomainError {
  public constructor() {
    super("A retired product cannot be renamed.");
  }
}
