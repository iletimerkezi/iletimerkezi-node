import { SmsResponse } from '../responses/SmsResponse';
import { IHttpClient } from '../IHttpClient';

export class SmsService {
    private sendDateTime: string = '';
    private iys: number = 1;
    private iysList: string = 'BIREYSEL';

    constructor(
        private httpClient: IHttpClient,
        private apiKey: string,
        private apiHash: string,
        private defaultSender?: string
    ) {}

    public schedule(sendDateTime: string): this {
        this.sendDateTime = sendDateTime;
        return this;
    }

    public enableIysConsent(): this {
        this.iys = 1;
        return this;
    }

    public disableIysConsent(): this {
        this.iys = 0;
        return this;
    }

    public setIysList(iysList: string): this {
        this.iysList = iysList;
        return this;
    }

    public async send(recipients: string | string[] | Record<string, string>, message?: string, sender?: string): Promise<SmsResponse> {
        const payload = {
            request: {
                authentication: {
                    key: this.apiKey,
                    hash: this.apiHash
                },
                order: {
                    sender: sender || this.defaultSender,
                    sendDateTime: this.sendDateTime,
                    iys: this.iys,
                    iysList: this.iysList,
                    message: this.buildMessages(recipients, message)
                }
            }
        };

        const response = await this.httpClient.post('send-sms/json', payload);

        return new SmsResponse(response.getBody(), response.getStatusCode());
    }

    private buildMessages(recipients: string | string[] | Record<string, string>, message?: string): any {
        // Tek numara ve mesaj durumu
        if (typeof recipients === 'string') {
            return {
                text: message,
                receipents: {
                    number: [recipients]
                }
            };
        }

        // Numara array'i ve tek mesaj durumu
        if (Array.isArray(recipients) && message !== undefined) {
            return {
                text: message,
                receipents: {
                    number: recipients
                }
            };
        }

        // Her numaraya farklı mesaj gönderme durumu
        if (!Array.isArray(recipients) && typeof recipients === 'object' && message === undefined) {
            const messages = [];
            for (const [number, text] of Object.entries(recipients)) {
                messages.push({
                    text: text,
                    receipents: {
                        number: [number]
                    }
                });
            }
            return messages;
        }

        throw new Error('Invalid recipients or message format.');
    }
}
