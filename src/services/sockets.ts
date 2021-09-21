import { Server } from 'socket.io';
import moment from 'moment';
import { productsAPI } from '../apis/productsAPI';
import { chatAPI } from '../apis/chatAPI';

const initWsServer = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida');

    // Lógica Lista Productos
    socket.on('askData', () => {
      productsAPI.getProducts().then((result) => socket.emit('productMessages', result));
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
      console.log(msg);
      const newChatLine = {
        nombre: msg.nombre,
        mensaje: msg.mensaje,
        timestamp: moment().format('h:mm a')
      };
      console.log(newChatLine);
      io.emit('chat-message', newChatLine);
      chatAPI.addChatLine(newChatLine);
    });
  });

  return io;
};

export default initWsServer;
