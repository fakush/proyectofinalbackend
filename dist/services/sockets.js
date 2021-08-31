"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const moment_1 = __importDefault(require("moment"));
const messages_1 = __importDefault(require("../utils/messages"));
const controllerFiles_1 = __importDefault(require("../controllers/controllerFiles"));
// Lógica Aux
const data = { username: undefined, text: undefined, time: 'string' };
const loadMyArray = new controllerFiles_1.default('productList.json');
const myArray = JSON.parse(loadMyArray.read());
const sendToLog = new controllerFiles_1.default('chat.log');
const nextId = () => myArray.reduce((item, max) => (item.id > max ? item.id : max), 0);
const initWsServer = (server) => {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('Nueva Conexion establecida');
        // Lógica Lista Productos
        socket.on('askData', () => {
            socket.emit('productMessages', myArray);
        });
        socket.on('new-product-message', (productData) => {
            const newMessage = {
                id: Number(nextId().id) + 1,
                title: productData.title,
                price: productData.price,
                thumbnail: productData.thumbnail
            };
            myArray.push(newMessage);
            io.emit('productMessages', myArray);
        });
        socket.on('chatMessage', (msg) => {
            data.username = msg.user;
            data.text = msg.message;
            data.time = (0, moment_1.default)().format('h:mm a');
            io.emit('chat-message', (0, messages_1.default)(data));
            console.log((0, messages_1.default)(data));
            sendToLog.write((0, messages_1.default)(data));
        });
    });
    return io;
};
exports.default = initWsServer;
