export type { CustomerRepository } from "./CustomerRepository.js";
export { CustomerNotFoundError } from "./errors/CustomerNotFoundError.js";

export type { CreateCustomerCommand } from "./create-customer/CreateCustomerCommand.js";
export type { CreateCustomerResult } from "./create-customer/CreateCustomerResult.js";
export { CreateCustomerUseCase } from "./create-customer/CreateCustomerUseCase.js";

export type { GetCustomerQuery } from "./get-customer/GetCustomerQuery.js";
export type { CustomerDto } from "./get-customer/CustomerDto.js";
export { GetCustomerQueryHandler } from "./get-customer/GetCustomerQueryHandler.js";

export type { ActivateCustomerCommand } from "./activate-customer/ActivateCustomerCommand.js";
export type { ActivateCustomerResult } from "./activate-customer/ActivateCustomerResult.js";
export { ActivateCustomerUseCase } from "./activate-customer/ActivateCustomerUseCase.js";

export type { SuspendCustomerCommand } from "./suspend-customer/SuspendCustomerCommand.js";
export type { SuspendCustomerResult } from "./suspend-customer/SuspendCustomerResult.js";
export { SuspendCustomerUseCase } from "./suspend-customer/SuspendCustomerUseCase.js";

export type { CloseCustomerCommand } from "./close-customer/CloseCustomerCommand.js";
export type { CloseCustomerResult } from "./close-customer/CloseCustomerResult.js";
export { CloseCustomerUseCase } from "./close-customer/CloseCustomerUseCase.js";

export type { ChangeCustomerSegmentCommand } from "./change-customer-segment/ChangeCustomerSegmentCommand.js";
export type { ChangeCustomerSegmentResult } from "./change-customer-segment/ChangeCustomerSegmentResult.js";
export { ChangeCustomerSegmentUseCase } from "./change-customer-segment/ChangeCustomerSegmentUseCase.js";
