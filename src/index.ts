import myServer from './services/server';
import initWsServer from './services/sockets';
// import { mySQLdbService, MySqliteDBService } from './services/db';
import { mongoDBService } from './services/mongo_db';

const port = process.env.Port || 8080;
initWsServer(myServer);
myServer.listen(port, () => console.log(`SERVER UP IN PORT ${port}`));
myServer.on('error', (err) => {
  console.log('SERVER ERROR: ', err);
});

mongoDBService.connect();
// mySQLdbService.init();
// MySqliteDBService.init();
