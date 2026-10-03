import { PartyId } from "@epos/enterprise-domain";

import type { PartyRepository } from "../PartyRepository.js";
import { PartyNotFoundError } from "../errors/PartyNotFoundError.js";

export type ActivatePartyCommand = {
  readonly partyId: string;
};

export type ActivatePartyResult = {
  readonly partyId: string;
  readonly status: "ACTIVE";
};

export class ActivatePartyUseCase {
  private readonly partyRepository: PartyRepository;

  public constructor(partyRepository: PartyRepository) {
    this.partyRepository = partyRepository;
  }

  public async execute(
    command: ActivatePartyCommand
  ): Promise<ActivatePartyResult> {
    const partyId = new PartyId(command.partyId);
    const party = await this.partyRepository.findById(partyId);

    if (!party) {
      throw new PartyNotFoundError(command.partyId);
    }

    party.activate();

    await this.partyRepository.save(party);

    return {
      partyId: party.getId().toString(),
      status: "ACTIVE"
    };
  }
}
