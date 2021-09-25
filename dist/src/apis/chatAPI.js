"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatAPI = void 0;
// import { newChatObject, ChatObject } from '../models/chat/chat.interfaces';
const chat_factory_1 = require("../models/chat/chat.factory");
const tipo = chat_factory_1.Persistencia.MongoDB;
class chatApiClass {
    constructor() {
        this.chat = chat_factory_1.ChatFactory.get(tipo);
    }
    addChatLine(chatData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newChatLine = yield this.chat.add(chatData);
            return newChatLine;
        });
    }
    getChatMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            const getChatLog = yield this.chat.getAll();
            return getChatLog;
        });
    }
}
exports.chatAPI = new chatApiClass();
