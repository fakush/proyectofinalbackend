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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenciaMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const normalizr_1 = require("normalizr");
const config_1 = __importDefault(require("../../../config"));
const logger_1 = require("../../../middleware/logger");
//MongoSchema
const dbCollection = 'chatLogs';
const messageSchema = new mongoose_1.default.Schema({
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
const messageModel = mongoose_1.default.model(dbCollection, messageSchema);
//NormalizrSchema
const author = new normalizr_1.schema.Entity('author', {}, { idAttribute: 'email' });
const message = new normalizr_1.schema.Entity('mensaje', { author: author }, { idAttribute: '_id' });
const chatLogSchema = new normalizr_1.schema.Array(message);
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
class PersistenciaMongo {
    constructor(local = false) {
        local
            ? (this.server = `mongodb://localhost:27017/${config_1.default.MONGO_LOCAL_DBNAME}`)
            : (this.server = `mongodb+srv://${config_1.default.MONGO_ATLAS_USER}:${config_1.default.MONGO_ATLAS_PASSWORD}@${config_1.default.MONGO_ATLAS_CLUSTER}/${config_1.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
        mongoose_1.default.connect(this.server);
        this.chatLog = messageModel;
        this.chatLog.count().then((count) => {
            if (count < 1) {
                logger_1.logger.log.info('Insertando Data Mockup');
                this.chatLog.insertMany(mockData);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messages = (yield messageModel.find()).map((aMsg) => ({
                    _id: aMsg._id,
                    author: aMsg.author,
                    message: aMsg.message
                }));
                let normalizedMessages = (0, normalizr_1.normalize)(messages, chatLogSchema);
                return normalizedMessages;
            }
            catch (err) {
                return err;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield newItem.save();
            return newItem;
        });
    }
}
exports.PersistenciaMongo = PersistenciaMongo;
