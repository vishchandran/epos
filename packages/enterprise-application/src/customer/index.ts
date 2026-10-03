export type { CustomerRepository } from "./CustomerRepository.js";
export { CustomerNotFoundError } from "./errors/CustomerNotFoundError.js";

export * from "./create-customer/CreateCustomerUseCase.js";

export type { GetCustomerQuery } from "./get-customer/GetCustomerQuery.js";
export type { CustomerDto } from "./get-customer/CustomerDto.js";
export { GetCustomerQueryHandler } from "./get-customer/GetCustomerQueryHandler.js";

export * from "./activate-customer/ActivateCustomerUseCase.js";

export * from "./suspend-customer/SuspendCustomerUseCase.js";

export * from "./close-customer/CloseCustomerUseCase.js";

export * from "./change-customer-segment/ChangeCustomerSegmentUseCase.js";
