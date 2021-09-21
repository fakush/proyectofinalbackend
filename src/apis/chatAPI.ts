import { newChatObject, ChatObject } from '../models/chat/chat.interfaces';
import { ChatFactory, Persistencia } from '../models/chat/chat.factory';

const tipo = Persistencia.SqlLite3;

class chatApiClass {
  private chat;

  constructor() {
    this.chat = ChatFactory.get(tipo);
  }

  async addChatLine(chatData: newChatObject): Promise<ChatObject> {
    const newChatLine = await this.chat!.add(chatData);
    return newChatLine;
  }
}

export const chatAPI = new chatApiClass();
