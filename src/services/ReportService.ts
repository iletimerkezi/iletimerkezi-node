import { IHttpClient } from '../IHttpClient';
import { ReportResponse } from '../responses/ReportResponse';

interface OrderRequest {
  page: number;
  rowCount: number;
  status?: string;
}

export class ReportService {
  private lastOrderId: number|null = null;
  private lastPage: number = 1;
  private rowCount: number = 1000;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly apiKey: string,
    private readonly apiHash: string
  ) {}

  /**
   * Get report for a specific order
   */
  public async get(orderId: number, page: number = 1): Promise<ReportResponse> {
    this.lastOrderId = orderId;
    this.lastPage = page;

    const payload = {
      request: {
        authentication: {
          key: this.apiKey,
          hash: this.apiHash,
        },
        order: {
          id: orderId,
          page: page,
          rowCount: this.rowCount
        }
      },
    };

    const response = await this.httpClient.post('get-report/json', payload);

    return new ReportResponse(response.getBody(), response.getStatusCode(), page);
  }

  public async next(): Promise<ReportResponse> {
    if (!this.lastOrderId || !this.lastPage) {
      throw new Error('No previous request found. Call list() first.');
    }

    return this.get(this.lastOrderId, this.lastPage + 1);
  }
}
