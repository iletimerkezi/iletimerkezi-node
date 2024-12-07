import { IHttpClient } from '../IHttpClient';
import { AccountResponse } from '../responses/AccountResponse';

export class AccountService {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly apiKey: string,
    private readonly apiHash: string
  ) {}

  public async balance(): Promise<AccountResponse> {
    const payload = {
      request: {
        authentication: {
          key: this.apiKey,
          hash: this.apiHash
        }
      }
    };

    const response = await this.httpClient.post('get-balance/json', payload);

    return new AccountResponse(response.getBody(), response.getStatusCode());
  }
}