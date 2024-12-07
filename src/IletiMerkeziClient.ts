import { AxiosHttpClient } from './AxiosHttpClient';
import { IHttpClient } from './IHttpClient';
import { SmsService } from './services/SmsService';
import { ReportService } from './services/ReportService';
import { SummaryService } from './services/SummaryService';
import { SenderService } from './services/SenderService';
import { BlacklistService } from './services/BlacklistService';
import { AccountService } from './services/AccountService';
import { WebhookService } from './services/WebhookService';

export class IletiMerkeziClient {
  private readonly httpClient: IHttpClient;
  private readonly apiKey: string;
  private readonly apiHash: string;
  private readonly defaultSender?: string;

  constructor(apiKey: string, apiHash: string, defaultSender?: string) {
    this.apiKey = apiKey;
    this.apiHash = apiHash;
    this.defaultSender = defaultSender;
    this.httpClient = new AxiosHttpClient();
  }

  public sms(): SmsService {
    return new SmsService(this.httpClient, this.apiKey, this.apiHash, this.defaultSender);
  }

  public reports(): ReportService {
    return new ReportService(this.httpClient, this.apiKey, this.apiHash);
  }

  public summary(): SummaryService {
    return new SummaryService(this.httpClient, this.apiKey, this.apiHash);
  }

  public senders(): SenderService {
    return new SenderService(this.httpClient, this.apiKey, this.apiHash);
  }

  public blacklist(): BlacklistService {
    return new BlacklistService(this.httpClient, this.apiKey, this.apiHash);
  }

  public account(): AccountService {
    return new AccountService(this.httpClient, this.apiKey, this.apiHash);
  }

  public webhook(): WebhookService {
    return new WebhookService();
  }

  /**
   * Get debug information about the last request and response
   */
  public debug(): string {
    return JSON.stringify({
      payload: JSON.parse(this.httpClient.getPayload()),
      response: this.httpClient.getBody(),
      status: this.httpClient.getStatusCode()
    }, null, 2);
  }
}
