import type { Agreement } from "../../agreement/entities/Agreement.js";
import { AgreementNotActiveForAccountOpeningError } from "../errors/AgreementNotActiveForAccountOpeningError.js";

export class AccountOpeningPolicy {
  public static ensureAgreementIsActive(agreement: Agreement): void {
    if (agreement.getStatus() !== "ACTIVE") {
      throw new AgreementNotActiveForAccountOpeningError(
        agreement.getId().toString()
      );
    }
  }
}
