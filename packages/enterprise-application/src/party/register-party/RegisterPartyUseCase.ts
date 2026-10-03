import { Party, PartyId } from "@epos/enterprise-domain";

import type { IdGenerator } from "../../shared/IdGenerator.js";
import type { PartyRepository } from "../PartyRepository.js";

export type RegisterPartyCommand = {
  readonly type: "PERSON" | "ORGANIZATION";
  readonly displayName: string;
};

export type RegisterPartyResult = {
  readonly partyId: string;
  readonly type: "PERSON" | "ORGANIZATION";
  readonly displayName: string;
  readonly status: "ACTIVE" | "INACTIVE";
};

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
