import { describe, expect, it } from "vitest";

import type { UseCase } from "../../../src/shared/UseCase.js";
import type { TransactionManager } from "../../../src/shared/transactions/TransactionManager.js";
import { TransactionalUseCase } from "../../../src/shared/transactions/TransactionalUseCase.js";

type TestCommand = { readonly value: string };
type TestResult = { readonly processed: string };

class RecordingTransactionManager implements TransactionManager {
  public transactionCount = 0;

  public async run<T>(operation: () => Promise<T>): Promise<T> {
    this.transactionCount += 1;
    return operation();
  }
}

class TestUseCase implements UseCase<TestCommand, TestResult> {
  public execute(command: TestCommand): Promise<TestResult> {
    return Promise.resolve({ processed: command.value.toUpperCase() });
  }
}

class FailingUseCase implements UseCase<TestCommand, TestResult> {
  public execute(): Promise<TestResult> {
    return Promise.reject(new Error("Operation failed."));
  }
}

describe("TransactionalUseCase", () => {
  it("executes a use case within one transaction boundary", async () => {
    const transactionManager = new RecordingTransactionManager();
    const useCase = new TransactionalUseCase(
      new TestUseCase(),
      transactionManager
    );

    await expect(useCase.execute({ value: "ledger" })).resolves.toEqual({
      processed: "LEDGER"
    });
    expect(transactionManager.transactionCount).toBe(1);
  });

  it("propagates a use case failure through the transaction boundary", async () => {
    const transactionManager = new RecordingTransactionManager();
    const useCase = new TransactionalUseCase(
      new FailingUseCase(),
      transactionManager
    );

    await expect(useCase.execute({ value: "ledger" })).rejects.toThrow(
      "Operation failed."
    );
    expect(transactionManager.transactionCount).toBe(1);
  });
});
