import myServer from './services/server';
import initWsServer from './services/sockets';
import Config from './config';

const port = Config.PORT;
initWsServer(myServer);
myServer.listen(port, () => console.log(`SERVER UP IN PORT ${port}`));
myServer.on('error', (err) => {
  console.log('SERVER ERROR: ', err);
});
