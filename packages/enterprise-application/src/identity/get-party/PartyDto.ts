export type PartyDto = {
  readonly partyId: string;
  readonly type: "PERSON" | "ORGANIZATION";
  readonly displayName: string;
  readonly status: "ACTIVE" | "INACTIVE";
};
