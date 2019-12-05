export class ServerUnreachableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerUnreachableError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class FormValidationError extends Error {
    private readonly errors: [];

    constructor(errors: []) {
      super();
      this.name = 'FormValidationError';
      this.errors = errors;
    }

    public getErrors() {
      const errors: any = [];
      const fields = Object.keys(this.errors);
      for (const field of fields) {
        // @ts-ignore
        for (const error of this.errors[field]) {
          errors.push({
            name: field,
            type: 'TODO get type from message error',
            message: error,
          });
        }
      }
      return errors;
    }
}
