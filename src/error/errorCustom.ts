export class ErrorCustom extends Error {
    code: number;
    constructor(message: string, code: number) {
      super(message);
      this.name = message;
      this.code = code;
    }
  }
  
  