export type CreateCustomerCommand = {
  readonly partyId: string;
  readonly segment: "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";
};
