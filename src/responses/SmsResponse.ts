import { BaseResponse } from './BaseResponse';

export class SmsResponse extends BaseResponse {

  public getOrderId(): string | null {
    return this.data?.order?.id;
  }

  public toJSON(): object {
    return {
      success: this.ok(),
      statusCode: this.getStatusCode(),
      message: this.getMessage(),
      orderId: this.getOrderId()
    };
  }
}
