import { MySqliteDBService } from '../services/db';
import moment from 'moment';

class PersistenciaChat {
  async add(data: any) {
    const newChatLine = {
      timestamp: moment().format('YYYY MMM DD hh:mm:ss'),
      user: data.username,
      message: data.text
    };
    console.log('enviando a persistencia');
    return await MySqliteDBService.create(newChatLine);
  }
}

export const persistenciaChatService = new PersistenciaChat();
