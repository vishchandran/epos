import { PartyId } from "@epos/enterprise-domain";

import type { PartyRepository } from "../PartyRepository.js";
import { PartyNotFoundError } from "../errors/PartyNotFoundError.js";
import type { GetPartyQuery } from "./GetPartyQuery.js";
import type { PartyDto } from "./PartyDto.js";

export class GetPartyQueryHandler {
  private readonly partyRepository: PartyRepository;

  public constructor(partyRepository: PartyRepository) {
    this.partyRepository = partyRepository;
  }

  public async execute(query: GetPartyQuery): Promise<PartyDto> {
    const partyId = new PartyId(query.partyId);
    const party = await this.partyRepository.findById(partyId);

    if (!party) {
      throw new PartyNotFoundError(query.partyId);
    }

    return {
      partyId: party.getId().toString(),
      type: party.getType(),
      displayName: party.getDisplayName(),
      status: party.getStatus()
    };
  }
}
