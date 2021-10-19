"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const server_1 = __importDefault(require("./services/server"));
const sockets_1 = __importDefault(require("./services/sockets"));
const config_1 = __importDefault(require("./config"));
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const getArgs_1 = require("./middleware/getArgs");
colors_1.default.enable();
const port = getArgs_1.portArgument || config_1.default.PORT;
const clusterArgument = getArgs_1.ClusterArgument || false;
const numCPUs = os_1.default.cpus().length;
console.log(`CLUSTER ==> ${clusterArgument}`.blue);
(0, sockets_1.default)(server_1.default);
if (cluster_1.default.isMaster && clusterArgument) {
    console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    server_1.default.listen(port, () => console.log(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`.green));
}
// myServer.listen(port, () => console.log(`SERVER UP IN PORT ${port}`.green));
// myServer.on('error', (err) => {
//   console.log('SERVER ERROR: '.red, err);
// });
// Imprimo en Consola el código de salida
process.on('exit', (code) => {
    console.log(`Exit ==> El proceso termino con codigo ${code}\n\n`);
});
