interface IWebhookData {
    orderId?: string;
    number?: string;
    status?: string;
    timestamp?: string;
  }
  
  export class WebhookReport {
    private data: IWebhookData;
  
    constructor(data: IWebhookData) {
      this.data = data || {};
    }
  
    public getOrderId(): string {
      return this.data.orderId || '';
    }
  
    public getNumber(): string {
      return this.data.number || '';
    }
  
    public getStatus(): string {
      return this.data.status || '';
    }
  
    public getTimestamp(): string {
      return this.data.timestamp || '';
    }
  
    public toJSON(): IWebhookData {
      return {
        orderId: this.getOrderId(),
        number: this.getNumber(),
        status: this.getStatus(),
        timestamp: this.getTimestamp()
      };
    }
  }