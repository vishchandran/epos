import type { UseCase } from "../UseCase.js";
import type { TransactionManager } from "./TransactionManager.js";

export class TransactionalUseCase<Command, Result> implements UseCase<
  Command,
  Result
> {
  public constructor(
    private readonly useCase: UseCase<Command, Result>,
    private readonly transactionManager: TransactionManager
  ) {}

  public execute(command: Command): Promise<Result> {
    return this.transactionManager.run(() => this.useCase.execute(command));
  }
}
