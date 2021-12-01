// import { newChatObject, ChatObject } from '../models/chat/chat.interfaces';
import { ChatFactory, Persistencia } from '../models/chat/chat.factory';
import { mongoRepositoryDAO } from '../models/chat/DAOS/mongoRepositoryDAO';

// const tipo = Persistencia.MongoAtlas;

class chatApiClass {
  // private chat;

  // constructor() {
  //   this.chat = ChatFactory.get(tipo);
  // }

  async addChatLine(chatData: any) {
    const newChatLine = await mongoRepositoryDAO.add(chatData);
    return newChatLine;
  }

  async getChatMessages() {
    const getChatLog = await mongoRepositoryDAO.getAll();
    return getChatLog;
  }
}

export const chatAPI = new chatApiClass();
