export type RegisterPartyCommand = {
  readonly type: "PERSON" | "ORGANIZATION";
  readonly displayName: string;
};
