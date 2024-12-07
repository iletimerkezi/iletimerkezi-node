import { IHttpClient } from '../IHttpClient';
import { SummaryResponse } from '../responses/SummaryResponse';

export class SummaryService {
  private lastStartDate: string = '';
  private lastEndDate: string = '';
  private lastPage: number = 1;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly apiKey: string,
    private readonly apiHash: string
  ) {}

  public async list(startDate: string, endDate: string, page: number = 1): Promise<SummaryResponse> {
    this.lastStartDate = startDate;
    this.lastEndDate = endDate;
    this.lastPage = page;

    const payload = {
      request: {
        authentication: {
          key: this.apiKey,
          hash: this.apiHash,
        },
        filter: {
          start: startDate,
          end: endDate,
          page: page
        }
      }
    };

    const response = await this.httpClient.post('get-reports/json', payload);

    return new SummaryResponse(response.getBody(), response.getStatusCode(), page);
  }

  public async next(): Promise<SummaryResponse> {
    if (!this.lastStartDate || !this.lastEndDate) {
      throw new Error('No previous request found. Call list() first.');
    }

    return this.list(this.lastStartDate, this.lastEndDate, this.lastPage + 1);
  }
}