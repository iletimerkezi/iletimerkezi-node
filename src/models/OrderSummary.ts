export class OrderSummary {
  private static readonly ORDER_STATUS_MESSAGES: { [key: string]: string } = {
    '113': 'SENDING',
    '114': 'COMPLETED',
    '115': 'CANCELED'
  };

  constructor(private readonly data: any) {}

  public getId(): string {
    return this.data?.id || '';
  }

  public getStatusCode(): string {
    return this.data?.status || '';
  }
  
  public getStatus(): string {
    return OrderSummary.ORDER_STATUS_MESSAGES[this.getStatusCode()] || '';
  }

  public getTotal(): number {
    return parseInt(this.data?.total || '0', 10);
  }

  public getDelivered(): number {
    return parseInt(this.data?.delivered || '0', 10);
  }

  public getUndelivered(): number {
    return parseInt(this.data?.undelivered || '0', 10);
  }

  public getWaiting(): number {
    return parseInt(this.data?.waiting || '0', 10);
  }

  public getSender(): string {
    return this.data?.sender || '';
  }

  public getSubmitAt(): string {
    return this.data?.submitAt || '';
  }

  public getSentAt(): string {
    return this.data?.sentAt || '';
  }
}
