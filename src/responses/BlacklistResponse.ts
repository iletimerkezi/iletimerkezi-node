import { BaseResponse } from './BaseResponse';

export class BlacklistResponse extends BaseResponse {
  private page: number;

  constructor(data: any, statusCode: number, page: number) {
    super(data, statusCode);
    this.page = page;
  }

  public getCount(): number {
    return this.data?.blacklist?.count || 0;
  }
  
  public getNumbers(): string[] {
    return this.data?.blacklist?.number || [];
  }

  public getTotalPages(): number {
    return Math.ceil(this.getCount() / (this.page * 1000));
  }

  public getCurrentPage(): number {
    return this.page;
  }

  public hasMorePages(): boolean {
    return this.getCurrentPage() < this.getTotalPages();
  }
}
