class SchemaValidationError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export default SchemaValidationError;
