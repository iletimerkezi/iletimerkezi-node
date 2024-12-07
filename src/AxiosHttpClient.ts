import axios, { AxiosInstance } from 'axios';
import { IHttpClient } from './IHttpClient';
import { VersionInfo } from './VersionInfo';

export class AxiosHttpClient implements IHttpClient {
  private baseUrl = 'https://api.iletimerkezi.com/v1/';
  private client: AxiosInstance;
  private lastResponseBody: any;
  private lastResponseStatusCode: number = 0;
  private lastPayload: string = '';

  constructor() {
    this.client = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `IletiMerkezi-Node/${VersionInfo.string()}`
      },
      validateStatus: function (status) {
        return status < 500;
      }
    });
  }

  public async post(url: string, options: any): Promise<any> {
    const response = await this.client.post(`${this.baseUrl}${url}`, options);
    
    this.lastPayload = JSON.stringify(options);
    this.lastResponseBody = response.data;
    this.lastResponseStatusCode = response.status;

    return this;
  }

  public getBody(): any {
    return this.lastResponseBody;
  }

  public getStatusCode(): number {
    return this.lastResponseStatusCode;
  }

  public getPayload(): string {
    return this.lastPayload;
  }
}