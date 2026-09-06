export class DatabaseConfigurationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
