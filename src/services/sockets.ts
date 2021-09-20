import { Server } from 'socket.io';
import moment from 'moment';
import formatMessages from '../utils/messages';
import { mongoDBService } from './mongo_db';

// Lógica Aux
const data = { username: 'string', text: 'string', time: 'string' };
let myArray: any = [];

const nextId = async () => {
  const item: any = await mongoDBService.findGreatest();
  return item.id + 1;
};

const initWsServer = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida');

    // Lógica Lista Productos

    socket.on('askData', () => {
      //TODO Fix this
      // mongoDBService.get().then((result) => socket.emit('productMessages', result));
    });

    socket.on('new-product-message', (productData) => {
      const newMessage = {
        id: 0,
        timestamp: moment().format('DD-MM-YYYY h:mm a'),
        nombre: productData.nombre,
        descripcion: productData.descripcion || 'Sin descripción',
        codigo: productData.codigo,
        foto: productData.foto || 'https://picsum.photos/200',
        precio: productData.precio,
        stock: productData.stock
      };
      nextId()
        .then((data) => (newMessage.id = data))
        .then(() => mongoDBService.create(newMessage))
        .then(() => mongoDBService.get())
        .then((data) => (myArray = data))
        .then(() => io.emit('productMessages', myArray));
    });

    socket.on('chatMessage', (msg) => {
      data.username = msg.user;
      data.text = msg.message;
      data.time = moment().format('h:mm a');
      io.emit('chat-message', formatMessages(data));
      console.log(formatMessages(data));
      mongoDBService.addToLog(data);
    });
  });

  return io;
};

export default initWsServer;
