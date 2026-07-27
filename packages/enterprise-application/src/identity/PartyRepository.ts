import type { Party } from "@epos/enterprise-domain";

export interface PartyRepository {
  save(party: Party): Promise<void>;
}
