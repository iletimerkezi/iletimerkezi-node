import { BaseResponse } from './BaseResponse';

interface IMessage {
  number: string;
  status: string;
}

export class ReportResponse extends BaseResponse {
  private currentPage: number = 1;
  private static readonly ORDER_STATUS_MESSAGES: { [key: string]: string } = {
    '113': 'SENDING',
    '114': 'COMPLETED',
    '115': 'CANCELED'
  };

  private static readonly MESSAGE_STATUS_MESSAGES: { [key: string]: string } = {
    '110': 'WAITING',
    '111': 'DELIVERED',
    '112': 'UNDELIVERED'
  };

  constructor(data: any, statusCode: number, page: number) {
    super(data, statusCode);
    this.currentPage = page;
  }

  public getOrderId(): string {
    return this.data?.order?.id || '';
  }

  public getOrderStatus(): string {
    const status = this.data?.order?.status?.toString() || '';
    return ReportResponse.ORDER_STATUS_MESSAGES[status] || status;
  }

  public getOrderStatusCode(): number {
    return parseInt(this.data?.order?.status?.toString() || '0', 10);
  }

  public getTotal(): number {
    return this.data?.order?.total || 0;
  }

  public getDelivered(): number {
    return this.data?.order?.delivered || 0;
  }

  public getUndelivered(): number {
    return this.data?.order?.undelivered || 0;
  }

  public getWaiting(): number {
    return this.data?.order?.waiting || 0;
  }

  public getSubmitAt(): string {
    return this.data?.order?.submitAt || '';
  }

  public getSendAt(): string {
    return this.data?.order?.sendAt || '';
  }

  public getSender(): string {
    return this.data?.order?.sender || '';
  }

  public getMessages(): IMessage[] {
    return this.data?.order?.message || [];
  }

  public getMessageCount(): number {
    return this.getMessages().length;
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public getTotalPages(): number {
    return Math.ceil(this.getTotal() / (this.currentPage * 1000));
  }

  public hasMorePages(): boolean {
    return this.getCurrentPage() < this.getTotalPages();
  }

  public getMessageStatus(index: number): string {
    const status = this.getMessages()[index]?.status?.toString() || '';
    return ReportResponse.MESSAGE_STATUS_MESSAGES[status] || status;
  }

  public getMessageStatusCode(index: number): number {
    return parseInt(this.getMessages()[index]?.status?.toString() || '0', 10);
  }

  public toJSON(): object {
    return {
      success: this.ok(),
      statusCode: this.getStatusCode(),
      message: this.getMessage(),
      order: {
        id: this.getOrderId(),
        status: this.getOrderStatus(),
        statusCode: this.getOrderStatusCode(),
        total: this.getTotal(),
        delivered: this.getDelivered(),
        undelivered: this.getUndelivered(),
        waiting: this.getWaiting(),
        submitAt: this.getSubmitAt(),
        sendAt: this.getSendAt(),
        sender: this.getSender(),
        messages: this.getMessages().map((msg, index) => ({
          number: msg.number,
          status: this.getMessageStatus(index),
          statusCode: this.getMessageStatusCode(index)
        }))
      }
    };
  }
}
