import colors from 'colors';
import myServer from './services/server';
import initWsServer from './services/sockets';
import Config from './config';
colors.enable();

const port = Config.PORT;
initWsServer(myServer);
myServer.listen(port, () => console.log(`SERVER UP IN PORT ${port}`.green));
myServer.on('error', (err) => {
  console.log('SERVER ERROR: '.red, err);
});
