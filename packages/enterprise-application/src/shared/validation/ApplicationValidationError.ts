import { ApplicationError } from "../ApplicationError.js";

export class ApplicationValidationError extends ApplicationError {
  public constructor(message: string) {
    super(message);
  }
}
