import type { LedgerStatus } from "@epos/enterprise-domain";

export type LedgerDto = {
  readonly ledgerId: string;
  readonly accountId: string;
  readonly status: LedgerStatus;
};
