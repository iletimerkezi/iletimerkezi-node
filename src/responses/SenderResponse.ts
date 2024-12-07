import { BaseResponse } from './BaseResponse';

export class SenderResponse extends BaseResponse {
  public getSenders(): string[] {
    return this.data?.senders?.sender || [];
  }
}