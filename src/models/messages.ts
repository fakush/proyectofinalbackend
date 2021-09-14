import mongoose from 'mongoose';

const dbCollection = 'mensajes';

export interface MessageData {
  username: String;
  text: String;
  time: String;
}

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: String, default: 'Sin descripción' }
});

export default mongoose.model(dbCollection, messageSchema);
