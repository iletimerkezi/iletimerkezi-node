import { IHttpClient } from '../IHttpClient';
import { BlacklistResponse } from '../responses/BlacklistResponse';
import { BaseResponse } from '../responses/BaseResponse';

interface BlacklistFilter {
  start?: string;
  end?: string;
}

export class BlacklistService {
  private lastFilter: BlacklistFilter | null = null;
  private lastPage: number | null = null;
  private rowCount: number = 1000;

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly apiKey: string,
    private readonly apiHash: string
  ) {}

  /**
   * Get blacklisted numbers
   * @param filter Optional filter parameters (start date, end date, page, rowCount)
   */
  public async list(page?: number, filter?: BlacklistFilter): Promise<BlacklistResponse> {

    page = page || 1;

    const payload = {
      request: {
        authentication: {
          key: this.apiKey,
          hash: this.apiHash,
        },
        blacklist: {
          ...(filter && {
            filter: {
              ...(filter.start && { start: filter.start }),
              ...(filter.end && { end: filter.end })
            },
          }),
          page: page,
          rowCount: this.rowCount,
        }
      },
    };

    this.lastFilter = filter || null;
    this.lastPage = page;

    const response = await this.httpClient.post('get-blacklist/json', payload);
    return new BlacklistResponse(response.getBody(), response.getStatusCode(), page);
  }

  /**
   * Get next page of blacklisted numbers
   * @throws Error if list() hasn't been called before
   */
  public async next(): Promise<BlacklistResponse> {
    if (!this.lastPage) {
      throw new Error('No previous request found. Call list() first.');
    }

    return this.list(this.lastPage + 1,this.lastFilter || undefined);
  }

  /**
   * Add numbers to blacklist
   */
  public async add(numbers: string | string[]): Promise<BaseResponse> {
    const payload = {
      request: {
        authentication: {
          key: this.apiKey,
          hash: this.apiHash,
        },
        blacklist: {
          number: Array.isArray(numbers) ? numbers[0] : numbers
        },
      },
    };

    const response = await this.httpClient.post('add-blacklist/json', payload);

    return new BaseResponse(response.getBody(), response.getStatusCode());
  }

  /**
   * Remove numbers from blacklist
   */
  public async remove(numbers: string | string[]): Promise<BaseResponse> {
    const payload = {
      request: {
        authentication: {
          key: this.apiKey,
          hash: this.apiHash,
        },
        blacklist: {
          number: Array.isArray(numbers) ? numbers[0] : numbers
        },
      },
    };

    const response = await this.httpClient.post('delete-blacklist/json', payload);

    return new BaseResponse(response.getBody(), response.getStatusCode());
  }
}