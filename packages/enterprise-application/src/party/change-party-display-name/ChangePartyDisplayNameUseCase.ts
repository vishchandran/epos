import { PartyId } from "@epos/enterprise-domain";

import type { PartyRepository } from "../PartyRepository.js";
import { PartyNotFoundError } from "../errors/PartyNotFoundError.js";
import type { ChangePartyDisplayNameCommand } from "./ChangePartyDisplayNameCommand.js";
import type { ChangePartyDisplayNameResult } from "./ChangePartyDisplayNameResult.js";

export class ChangePartyDisplayNameUseCase {
  private readonly partyRepository: PartyRepository;

  public constructor(partyRepository: PartyRepository) {
    this.partyRepository = partyRepository;
  }

  public async execute(
    command: ChangePartyDisplayNameCommand
  ): Promise<ChangePartyDisplayNameResult> {
    const partyId = new PartyId(command.partyId);
    const party = await this.partyRepository.findById(partyId);

    if (!party) {
      throw new PartyNotFoundError(command.partyId);
    }

    party.changeDisplayName(command.displayName);

    await this.partyRepository.save(party);

    return {
      partyId: party.getId().toString(),
      displayName: party.getDisplayName()
    };
  }
}
