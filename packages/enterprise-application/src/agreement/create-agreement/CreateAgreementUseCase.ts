import {
  Agreement,
  AgreementId,
  CustomerId,
  ProductId
} from "@epos/enterprise-domain";

import type { CustomerRepository } from "../../customer/CustomerRepository.js";
import { CustomerNotFoundError } from "../../customer/errors/CustomerNotFoundError.js";
import type { ProductRepository } from "../../product/ProductRepository.js";
import { ProductNotFoundError } from "../../product/errors/ProductNotFoundError.js";
import type { IdGenerator } from "../../shared/IdGenerator.js";
import { parseDate } from "../../shared/validation/parseDate.js";
import type { AgreementRepository } from "../AgreementRepository.js";
import type { CreateAgreementCommand } from "./CreateAgreementCommand.js";
import type { CreateAgreementResult } from "./CreateAgreementResult.js";

export class CreateAgreementUseCase {
  public constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly productRepository: ProductRepository,
    private readonly agreementRepository: AgreementRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  public async execute(
    command: CreateAgreementCommand
  ): Promise<CreateAgreementResult> {
    const customerId = new CustomerId(command.customerId);
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(command.customerId);
    }

    const productId = new ProductId(command.productId);
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ProductNotFoundError(command.productId);
    }

    const agreement = Agreement.create(
      new AgreementId(this.idGenerator.generate()),
      customerId,
      productId,
      parseDate(command.effectiveDate, "effectiveDate")
    );

    await this.agreementRepository.save(agreement);

    return {
      agreementId: agreement.getId().toString(),
      customerId: agreement.getCustomerId().toString(),
      productId: agreement.getProductId().toString(),
      status: "DRAFT",
      effectiveDate: agreement.getEffectiveDate().toISOString()
    };
  }
}
