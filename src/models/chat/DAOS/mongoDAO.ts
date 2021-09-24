import mongoose from 'mongoose';
import { normalize, schema } from 'normalizr';
import Config from '../../../config';

//MongoSchema
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
const messageModel = mongoose.model(dbCollection, messageSchema);

//NormalizrSchema
const author = new schema.Entity('author', {}, { idAttribute: 'email' });
const message = new schema.Entity('mensaje', { author: author }, { idAttribute: '_id' });
const chatLogSchema = new schema.Array(message);

//AuxData
const mockData = [
  {
    author: {
      email: 'hulk@avengers.com',
      nombre: 'Bruce',
      apellido: 'Banner',
      alias: 'Hulk',
      edad: 36,
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Hulk-icon.png'
    },
    message: 'Hulk Smash',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      email: 'the.i.man@avengers.com',
      nombre: 'Tony',
      apellido: 'Stark',
      alias: 'Iron Man',
      edad: 22,
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Iron-Man-icon.png'
    },
    message: 'Not again, please...',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      email: 'hulk@avengers.com',
      nombre: 'Bruce',
      apellido: 'Banner',
      alias: 'Hulk',
      edad: 36,
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Hulk-icon.png'
    },
    message: 'Puny human!',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      email: 'the.i.man@avengers.com',
      nombre: 'Tony',
      apellido: 'Stark',
      alias: 'Iron Man',
      edad: 22,
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Iron-Man-icon.png'
    },
    message: 'You know! I don´t have to take this from you...',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      email: 'hulk@avengers.com',
      nombre: 'Bruce',
      apellido: 'Banner',
      alias: 'Hulk',
      edad: 36,
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Hulk-icon.png'
    },
    message: 'Puny human!',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      email: 'the.i.man@avengers.com',
      nombre: 'Tony',
      apellido: 'Stark',
      alias: 'Iron Man',
      edad: 22,
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Iron-Man-icon.png'
    },
    message: 'That´s It! I´m taking your phone privilleges...',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      email: 'hulk@avengers.com',
      nombre: 'Bruce',
      apellido: 'Banner',
      alias: 'Hulk',
      edad: 36,
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Hulk-icon.png'
    },
    message: 'Hulk sad...',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      alias: 'YouKnowMe',
      apellido: 'Laufeyson',
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Loki-icon.png',
      edad: 35,
      email: 'loki@avengerssucks.com',
      nombre: 'Loki'
    },
    message: 'Whassssaaaaa!',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      alias: 'The God Of Thunder',
      apellido: 'Laufeyson',
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/256/Avengers-Thor-icon.png',
      edad: 46,
      email: 'god_of_thunder@avengers.com',
      nombre: 'Thor'
    },
    message: 'Whassssaaaaa!',
    timestamp: '16 de Abril de 1974'
  },
  {
    author: {
      email: 'the.i.man@avengers.com',
      nombre: 'Tony',
      apellido: 'Stark',
      alias: 'Iron Man',
      edad: 22,
      avatar: 'https://icons.iconarchive.com/icons/hopstarter/superhero-avatar/128/Avengers-Iron-Man-icon.png'
    },
    message: 'God Damn It!!!',
    timestamp: '16 de Abril de 1974'
  }
];

export class PersistenciaMongo {
  private server: string;
  private chatLog;

  constructor(local: boolean = false) {
    local
      ? (this.server = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`)
      : (this.server = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
    mongoose.connect(this.server);
    this.chatLog = messageModel;
    this.chatLog.count().then((count) => {
      if (count < 1) {
        console.log('Insertando Data Mockup');
        this.chatLog.insertMany(mockData);
      }
    });
  }

  async getAll() {
    try {
      let messages = (await messageModel.find()).map((aMsg: any) => ({
        _id: aMsg._id,
        author: aMsg.author,
        message: aMsg.message
      }));
      let normalizedMessages = normalize(messages, chatLogSchema);
      return normalizedMessages;
    } catch (err) {
      return err;
    }
  }

  async add(data: any) {
    const newChatLine = {
      author: {
        email: data.email,
        nombre: data.nombre,
        apellido: data.apellido,
        alias: data.alias,
        edad: data.edad,
        avatar: data.avatar
      },
      message: data.message,
      timestamp: data.timestamp
    };
    const newItem = new this.chatLog(newChatLine);
    await newItem.save();
    return newItem;
  }
}
