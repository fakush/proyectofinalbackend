import colors from 'colors';
import myServer from './services/server';
import initWsServer from './services/sockets';
import Config from './config';
import os from 'os';
import cluster from 'cluster';
import { portArgument, ClusterArgument } from './middleware/getArgs';
import { logger } from './middleware/logger';
colors.enable();

const port = portArgument || Config.PORT;
const clusterArgument = ClusterArgument || false;
const numCPUs = os.cpus().length;
logger.log.info(`CLUSTER ==> ${clusterArgument}`.blue);

initWsServer(myServer);

if (cluster.isMaster && clusterArgument) {
  logger.log.info(`NUMERO DE CPUS ===> ${numCPUs}`);
  logger.log.info(`PID MASTER ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker: any) => {
    logger.log.error(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  myServer.listen(port, () =>
    logger.log.info(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`.green)
  );
}

// myServer.listen(port, () => logger.log.info(`SERVER UP IN PORT ${port}`.green));
// myServer.on('error', (err) => {
//   logger.log.error('SERVER ERROR: '.red, err);
// });

// Imprimo en Consola el código de salida
process.on('exit', (code) => {
  logger.log.error(`Exit ==> El proceso termino con codigo ${code}\n\n`);
});
