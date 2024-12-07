import { WebhookReport } from '../models/WebhookReport';

export class WebhookService {
  /**
   * Handle incoming webhook data
   */
  public async handle(): Promise<WebhookReport> {
    // Node.js'de raw body'yi almak için
    const rawBody = await this.getRawBody();
    
    if (!rawBody) {
      throw new Error('No POST data received');
    }

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (error) {
      throw new Error('Invalid JSON payload');
    }

    return new WebhookReport(data);
  }

  private async getRawBody(): Promise<string> {
    return new Promise((resolve, reject) => {
      let data = '';
      process.stdin.on('data', chunk => data += chunk);
      process.stdin.on('end', () => resolve(data));
      process.stdin.on('error', reject);
    });
  }
}