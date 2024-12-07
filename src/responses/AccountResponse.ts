import { BaseResponse } from './BaseResponse';

export class AccountResponse extends BaseResponse {

  constructor(data: any, statusCode: number) {
    super(data, statusCode);
  }

  public getAmount(): number {
    return parseFloat(this.data?.balance?.amount || '0');
  }

  public getCredits(): number {
    return parseInt(this.data?.balance?.sms || '0', 10);
  }

  public toJSON(): object {
    return {
      success: this.ok(),
      statusCode: this.getStatusCode(),
      message: this.getMessage(),
      amount: this.getAmount(),
      credits: this.getCredits()
    };
  }
}