export type ChangeCustomerSegmentCommand = {
  readonly customerId: string;
  readonly segment: "RETAIL" | "SMALL_BUSINESS" | "COMMERCIAL";
};
