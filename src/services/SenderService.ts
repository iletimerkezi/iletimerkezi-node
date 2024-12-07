import { IHttpClient } from '../IHttpClient';
import { SenderResponse } from '../responses/SenderResponse';

export class SenderService {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly apiKey: string,
    private readonly apiHash: string
  ) {}

  public async list(): Promise<SenderResponse> {
    const payload = {
      request: {
        authentication: {
          key: this.apiKey,
          hash: this.apiHash
        }
      }
    };

    const response = await this.httpClient.post('get-sender/json', payload);

    return new SenderResponse(response.getBody(), response.getStatusCode());
  }
}