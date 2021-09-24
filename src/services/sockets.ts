import { Server } from 'socket.io';
import moment from 'moment';
import { productsAPI } from '../apis/productsAPI';
import { chatAPI } from '../apis/chatAPI';
import faker from 'faker';

const initWsServer = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida');

    // Lógica Lista Productos
    socket.on('askData', () => {
      productsAPI.getProducts().then((result) => socket.emit('productMessages', result));
      chatAPI.getChatMessages().then((result) => socket.emit('chatLog-messages', result));
    });

    socket.on('new-product-message', (productData) => {
      const newProduct = {
        id: 0,
        timestamp: moment().format('DD-MM-YYYY h:mm a'),
        nombre: productData.nombre,
        descripcion: productData.descripcion || 'Sin descripción',
        codigo: productData.codigo,
        foto: productData.foto || 'https://picsum.photos/200',
        precio: productData.precio,
        stock: productData.stock
      };
      productsAPI
        .addProduct(newProduct)
        .then(() => productsAPI.getProducts())
        .then((data) => io.emit('productMessages', data));
    });

    socket.on('chatMessage', (msg) => {
      const newChatEntry = {
        email: msg.email,
        nombre: msg.nombre || faker.name.firstName(),
        apellido: msg.apellido || faker.name.lastName(),
        edad: msg.edad || faker.datatype.number(90),
        alias: msg.alias || faker.name.jobArea(),
        avatar: msg.avatar || faker.image.avatar(),
        message: msg.mensaje || faker.lorem.sentence(),
        timestamp: moment().format()
      };
      const newChatLine = {
        avatar: msg.avatar || faker.image.avatar(),
        nombre: msg.nombre,
        apellido: msg.apellido,
        email: msg.email,
        mensaje: msg.mensaje
      };
      // console.log(newChatLine);
      io.emit('chat-message', newChatLine);
      chatAPI.addChatLine(newChatEntry);
    });
  });

  return io;
};

export default initWsServer;
