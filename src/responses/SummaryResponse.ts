import { BaseResponse } from './BaseResponse';
import { OrderSummary } from '../models/OrderSummary';

export class SummaryResponse extends BaseResponse {
  private currentPage: number = 1;

  constructor(data: any, statusCode: number, page: number) {
    super(data, statusCode);
    this.currentPage = page;
  }

  public getCount(): number {
    return this.data?.count || 0;
  }

  public getOrders(): OrderSummary[] {
    const orders = this.data?.orders || [];
    return orders.map((order: any) => new OrderSummary(order));
  }

  public getTotalPages(): number {
    return Math.ceil(this.getCount() / 30);
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public hasMorePages(): boolean {
    return this.currentPage < this.getTotalPages();
  }
}
