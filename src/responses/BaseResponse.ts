import { IResponse } from './IResponse';

export class BaseResponse implements IResponse {
  protected data: any;
  protected statusCode: number;

  constructor(data: any, statusCode: number) {
    this.data = data?.response || {};
    this.statusCode = statusCode;
    this.customizeData();
  }

  protected customizeData(): void {
    // Override this method in child classes if needed
  }

  public ok(): boolean {
    return this.statusCode === 200;
  }

  public getMessage(): string {
    return this.data?.status?.message || '';
  }

  public getStatusCode(): number {
    return this.statusCode;
  }

  public getErrorCode(): string {
    return this.data?.status?.code || '';
  }

  public toJSON(): object {
    return {
      success: this.ok(),
      statusCode: this.getStatusCode(),
      message: this.getMessage(),
      errorCode: this.getErrorCode()
    };
  }
}
