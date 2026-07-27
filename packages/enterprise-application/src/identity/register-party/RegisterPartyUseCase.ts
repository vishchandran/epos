import { Party, PartyId } from "@epos/enterprise-domain";

import type { IdGenerator } from "../../shared/IdGenerator.js";
import type { PartyRepository } from "../PartyRepository.js";
import type { RegisterPartyCommand } from "./RegisterPartyCommand.js";
import type { RegisterPartyResult } from "./RegisterPartyResult.js";

export class RegisterPartyUseCase {
  private readonly partyRepository: PartyRepository;
  private readonly idGenerator: IdGenerator;

  public constructor(
    partyRepository: PartyRepository,
    idGenerator: IdGenerator
  ) {
    this.partyRepository = partyRepository;
    this.idGenerator = idGenerator;
  }

  public async execute(
    command: RegisterPartyCommand
  ): Promise<RegisterPartyResult> {
    const partyId = new PartyId(this.idGenerator.generate());

    const party = Party.register(partyId, command.type, command.displayName);

    await this.partyRepository.save(party);

    return {
      partyId: party.getId().toString(),
      type: party.getType(),
      displayName: party.getDisplayName(),
      status: party.getStatus()
    };
  }
}
