import { Server } from 'socket.io';
import moment from 'moment';
import formatMessages from '../utils/messages';
import AuxFile from '../controllers/controllerFiles';

// Lógica Aux
const data = { username: undefined, text: undefined, time: 'string' };
const loadMyArray = new AuxFile('productList.json');
const myArray = JSON.parse(loadMyArray.read());
const sendToLog = new AuxFile('chat.log');

const nextId = () => myArray.reduce((item: { id: number }, max: number) => (item.id > max ? item.id : max), 0);

const initWsServer = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida');

    // Lógica Lista Productos

    socket.on('askData', () => {
      socket.emit('productMessages', myArray);
    });

    socket.on('new-product-message', (productData) => {
      const newMessage = {
        id: Number(nextId().id) + 1,
        timestamp: moment().format('DD-MM-YYYY h:mm a'),
        nombre: productData.nombre,
        descripcion: productData.descripcion,
        codigo: productData.codigo,
        foto: productData.foto,
        precio: productData.precio,
        price: productData.price,
        stock: productData.stock
      };
      myArray.push(newMessage);
      io.emit('productMessages', myArray);
    });

    socket.on('chatMessage', (msg) => {
      data.username = msg.user;
      data.text = msg.message;
      data.time = moment().format('h:mm a');
      io.emit('chat-message', formatMessages(data));
      console.log(formatMessages(data));
      sendToLog.write(formatMessages(data));
    });
  });

  return io;
};

export default initWsServer;
