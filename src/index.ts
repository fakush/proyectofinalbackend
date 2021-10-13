import colors from 'colors';
import myServer from './services/server';
import initWsServer from './services/sockets';
import Config from './config';
import { portArgument } from './middleware/getArgs';
colors.enable();

const port = portArgument || Config.PORT;
initWsServer(myServer);
myServer.listen(port, () => console.log(`SERVER UP IN PORT ${port}`.green));
myServer.on('error', (err) => {
  console.log('SERVER ERROR: '.red, err);
});

// Imprimo en Consola el código de salida
process.on('exit', (code) => {
  console.log(`Exit ==> El proceso termino con codigo ${code}\n\n`);
});
