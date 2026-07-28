import { PartyId } from "@epos/enterprise-domain";

import type { PartyRepository } from "../PartyRepository.js";
import { PartyNotFoundError } from "../errors/PartyNotFoundError.js";
import type { DeactivatePartyCommand } from "./DeactivatePartyCommand.js";
import type { DeactivatePartyResult } from "./DeactivatePartyResult.js";

export class DeactivatePartyUseCase {
  private readonly partyRepository: PartyRepository;

  public constructor(partyRepository: PartyRepository) {
    this.partyRepository = partyRepository;
  }

  public async execute(
    command: DeactivatePartyCommand
  ): Promise<DeactivatePartyResult> {
    const partyId = new PartyId(command.partyId);
    const party = await this.partyRepository.findById(partyId);

    if (!party) {
      throw new PartyNotFoundError(command.partyId);
    }

    party.deactivate();

    await this.partyRepository.save(party);

    return {
      partyId: party.getId().toString(),
      status: "INACTIVE"
    };
  }
}
