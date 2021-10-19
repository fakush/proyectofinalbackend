import colors from 'colors';
import myServer from './services/server';
import initWsServer from './services/sockets';
import Config from './config';
import os from 'os';
import cluster from 'cluster';
import { portArgument, ClusterArgument } from './middleware/getArgs';
colors.enable();

const port = portArgument || Config.PORT;
const clusterArgument = ClusterArgument || false;
const numCPUs = os.cpus().length;
console.log(`CLUSTER ==> ${clusterArgument}`.blue);

initWsServer(myServer);

if (cluster.isMaster && clusterArgument) {
  console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker: any) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  myServer.listen(port, () =>
    console.log(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`.green)
  );
}

// myServer.listen(port, () => console.log(`SERVER UP IN PORT ${port}`.green));
// myServer.on('error', (err) => {
//   console.log('SERVER ERROR: '.red, err);
// });

// Imprimo en Consola el código de salida
process.on('exit', (code) => {
  console.log(`Exit ==> El proceso termino con codigo ${code}\n\n`);
});
