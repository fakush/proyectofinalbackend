import twilio from 'twilio';
import config from '../config';

class Twilio {
  private twilio;

  constructor() {
    this.twilio = twilio(config.TWILIO_ACCOUNT_ID, config.TWILIO_TOKEN);
  }

  async sendMessage(cellphoneNumber: string, message: string) {
    const params = {
      body: message,
      from: config.TWILIO_CELLPHONE,
      to: cellphoneNumber
    };

    const response = await this.twilio.messages.create(params);
    return response;
  }
}

export const SmsService = new Twilio();
