// import { newChatObject, ChatObject } from '../models/chat/chat.interfaces';
import { ChatFactory, Persistencia } from '../models/chat/chat.factory';

const tipo = Persistencia.MongoAtlas;

class chatApiClass {
  private chat;

  constructor() {
    this.chat = ChatFactory.get(tipo);
  }

  async addChatLine(chatData: any) {
    const newChatLine = await this.chat.add(chatData);
    return newChatLine;
  }

  async getChatMessages() {
    const getChatLog = await this.chat.getAll();
    return getChatLog;
  }
}

export const chatAPI = new chatApiClass();
