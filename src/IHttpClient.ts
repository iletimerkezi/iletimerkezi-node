export interface IHttpClient {
    post(url: string, options: any): Promise<any>;
    getBody(): any;
    getStatusCode(): number;
    getPayload(): string;
  }