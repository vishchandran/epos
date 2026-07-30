export type CreateCustomerResult = {
  readonly customerId: string;
  readonly partyId: string;
  readonly status: "PENDING";
  readonly segment: "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";
  readonly customerSince: string;
};
