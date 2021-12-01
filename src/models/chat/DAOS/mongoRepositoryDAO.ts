import { ChatRepository } from '../../../repositories/ChatRepository';
import mongoose from 'mongoose';

const dbCollection = 'chatLogs';
const messageSchema = new mongoose.Schema({
  author: {
    email: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    apellido: { type: String, required: true, max: 50 },
    alias: { type: String, required: true, max: 50 },
    edad: { type: Number, required: true },
    avatar: { type: String, required: true, max: 50 }
  },
  message: { type: String, required: true, max: 1000 },
  timestamp: { type: String, required: true, max: 1000 }
});

export const mongoRepositoryDAO = new ChatRepository(dbCollection, messageSchema);
