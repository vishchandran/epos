import { ApplicationValidationError } from "./ApplicationValidationError.js";

export const parseDate = (value: unknown, fieldName: string): Date => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ApplicationValidationError(`${fieldName} must be a valid date.`);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new ApplicationValidationError(`${fieldName} must be a valid date.`);
  }

  return date;
};
