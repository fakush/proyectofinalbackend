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
const socket_io_1 = require("socket.io");
const moment_1 = __importDefault(require("moment"));
const messages_1 = __importDefault(require("../utils/messages"));
// import { persistenciaChatService } from '../persistence/persistenceDBChat';
const mongo_db_1 = require("../services/mongo_db");
// Lógica Aux
const data = { username: undefined, text: undefined, time: 'string' };
// const loadMyArray = new AuxFile('productList.json');
// const myArray = JSON.parse(loadMyArray.read());
let myArray = [];
// const sendToLog = new AuxFile('chat.log');
const nextId = () => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield mongo_db_1.mongoDBService.findGreatest();
    return item.id + 1;
});
const initWsServer = (server) => {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('Nueva Conexion establecida');
        // Lógica Lista Productos
        socket.on('askData', () => {
            mongo_db_1.mongoDBService.get().then((result) => socket.emit('productMessages', result));
        });
        socket.on('new-product-message', (productData) => {
            const newMessage = {
                id: 0,
                timestamp: (0, moment_1.default)().format('DD-MM-YYYY h:mm a'),
                nombre: productData.nombre,
                descripcion: productData.descripcion || 'Sin descripción',
                codigo: productData.codigo,
                foto: productData.foto || 'https://picsum.photos/200',
                precio: productData.precio,
                stock: productData.stock
            };
            nextId()
                .then((data) => (newMessage.id = data))
                .then(() => mongo_db_1.mongoDBService.create(newMessage))
                .then(() => mongo_db_1.mongoDBService.get())
                .then((data) => (myArray = data))
                .then(() => io.emit('productMessages', myArray));
        });
        socket.on('chatMessage', (msg) => {
            data.username = msg.user;
            data.text = msg.message;
            data.time = (0, moment_1.default)().format('h:mm a');
            io.emit('chat-message', (0, messages_1.default)(data));
            console.log((0, messages_1.default)(data));
            // sendToLog.write(formatMessages(data));
            // persistenciaChatService.add(data);
            mongo_db_1.mongoDBService.addToLog(data);
        });
    });
    return io;
};
exports.default = initWsServer;
