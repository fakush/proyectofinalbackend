const chatForm = document.getElementById('chat-form');
const chatWindow = document.querySelector('.chatWindow');
const msg = document.getElementById('msg');
const chatEmail = document.getElementById('chatEmail');
// const loginForm = document.getElementById('loginForm');

// eslint-disable-next-line no-undef
const socket = io.connect('http://localhost:8080', { forceNew: true });
// const socket = io();

// Conecto al server
socket.emit('askData');

// lógica Chat

// Armo DOM mensajes
const outputMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('chatMessage');
  div.innerHTML = `<p><span class="chatUserName">${message.username}</span>
  <span class="chatTime">${message.time}</span>
  <span class="chatText">${message.text}</span></p>`;
  chatWindow.appendChild(div);
};

// Mando mensaje a ventana chat
socket.on('chat-message', (data) => {
  outputMessage(data);
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

// Mando user al server
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   socket.emit('chatUserLogin', chatEmail.value);
// });

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Mando mensaje al server
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Reviso que este completo el email sino paso alerta
  if (validateEmail(chatEmail.value)) {
    const mensaje = { user: chatEmail.value, message: msg.value };
    socket.emit('chatMessage', mensaje);
    msg.value = '';
  } else {
    alert('Es necesario completar el campo de email.');
  }
});

// Lógica Listado Productos
// Recibo data del form y la paso como nuevo mensaje
// eslint-disable-next-line no-unused-vars
const sendData = (e) => {
  const input = {
    nombre: document.getElementById('title').value,
    descripcion: document.getElementById('description').value,
    codigo: document.getElementById('code').value,
    foto: document.getElementById('thumbnail').value,
    precio: document.getElementById('price').value,
    stock: document.getElementById('stock').value
  };
  socket.emit('new-product-message', input);
};

// Paso al browser cada dato del array
const render = (data) => {
  const html = data
    .map(
      (item) => `<ul class='list-group list-group-horizontal row' style="width: 75vw;">
      <li class='list-group-item col-1'>${item.id}</li>
      <li class='list-group-item col-2'>${item.timestamp}</li>
      <li class='list-group-item col-1'>${item.nombre}</li>
      <li class='list-group-item col-3'>${item.descripcion}</li>
      <li class='list-group-item col-1'>${item.codigo}</li>
      <li class='list-group-item col-1'>${item.precio}</li>
      <li class='list-group-item col-1'>${item.stock}</li>
      <li class='list-group-item col-2'><img src="${item.foto}" style="max-width: 100; max-heigth: 100"></img></li>
    </ul>`
    )
    .join(' ');

  document.getElementById('productList').innerHTML = html;
};

// Paso todo el array de mensajes
socket.on('productMessages', (data) => {
  render(data);
});
