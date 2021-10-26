"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const moment_1 = __importDefault(require("moment"));
const productsAPI_1 = require("../apis/productsAPI");
const chatAPI_1 = require("../apis/chatAPI");
const faker_1 = __importDefault(require("faker"));
const logger_1 = require("../middleware/logger");
const initWsServer = (server) => {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        logger_1.logger.log.info('Nueva Conexion establecida');
        // Lógica Lista Productos
        socket.on('askData', () => {
            productsAPI_1.productsAPI.getProducts().then((result) => socket.emit('productMessages', result));
            chatAPI_1.chatAPI.getChatMessages().then((result) => socket.emit('chatLog-messages', result));
        });
        socket.on('new-product-message', (productData) => {
            const newProduct = {
                id: 0,
                timestamp: (0, moment_1.default)().format('DD-MM-YYYY h:mm a'),
                nombre: productData.nombre,
                descripcion: productData.descripcion || 'Sin descripción',
                codigo: productData.codigo,
                foto: productData.foto || 'https://picsum.photos/200',
                precio: productData.precio,
                stock: productData.stock
            };
            productsAPI_1.productsAPI
                .addProduct(newProduct)
                .then(() => productsAPI_1.productsAPI.getProducts())
                .then((data) => io.emit('productMessages', data));
        });
        socket.on('chatMessage', (msg) => {
            const newChatEntry = {
                email: msg.email,
                nombre: msg.nombre || faker_1.default.name.firstName(),
                apellido: msg.apellido || faker_1.default.name.lastName(),
                edad: msg.edad || faker_1.default.datatype.number(90),
                alias: msg.alias || faker_1.default.name.jobArea(),
                avatar: msg.avatar || faker_1.default.image.avatar(),
                message: msg.mensaje || faker_1.default.lorem.sentence(),
                timestamp: (0, moment_1.default)().format()
            };
            const newChatLine = {
                avatar: msg.avatar || faker_1.default.image.avatar(),
                nombre: msg.nombre,
                apellido: msg.apellido,
                email: msg.email,
                mensaje: msg.mensaje
            };
            // logger.log.info(newChatLine);
            io.emit('chat-message', newChatLine);
            chatAPI_1.chatAPI.addChatLine(newChatEntry);
        });
    });
    return io;
};
exports.default = initWsServer;
