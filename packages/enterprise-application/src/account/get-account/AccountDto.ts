import type { AccountStatus } from "@epos/enterprise-domain";

export type AccountDto = {
  readonly accountId: string;
  readonly agreementId: string;
  readonly status: AccountStatus;
};
