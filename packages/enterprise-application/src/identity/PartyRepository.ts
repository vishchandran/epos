import type { Party, PartyId } from "@epos/enterprise-domain";

export interface PartyRepository {
  findById(partyId: PartyId): Promise<Party | null>;
  save(party: Party): Promise<void>;
}
