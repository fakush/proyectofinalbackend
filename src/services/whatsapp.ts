import twilio from 'twilio';
import config from '../config';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';

class Twilio {
  private twilio;

  constructor() {
    this.twilio = twilio(config.TWILIO_ACCOUNT_ID, config.TWILIO_TOKEN);
  }

  async sendMessage(cellphoneNumber: string, message: string) {
    const params: MessageListInstanceCreateOptions = {
      body: message,
      from: `whatsapp:${config.TWILIO_WHASTAPP_NUMBER}`,
      to: `whatsapp:${cellphoneNumber}`
    };

    const response = await this.twilio.messages.create(params);
    return response;
  }
}

export const WhatsappService = new Twilio();
