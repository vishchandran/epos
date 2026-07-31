export type CustomerDto = {
  readonly customerId: string;
  readonly partyId: string;
  readonly status: "PENDING" | "ACTIVE" | "SUSPENDED" | "CLOSED";
  readonly segment: "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";
  readonly customerSince: string;
};
