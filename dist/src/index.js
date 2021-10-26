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
const logger_1 = require("./middleware/logger");
colors_1.default.enable();
const port = getArgs_1.portArgument || config_1.default.PORT;
const clusterArgument = getArgs_1.ClusterArgument || false;
const numCPUs = os_1.default.cpus().length;
logger_1.logger.log.info(`CLUSTER ==> ${clusterArgument}`.blue);
(0, sockets_1.default)(server_1.default);
if (cluster_1.default.isMaster && clusterArgument) {
    logger_1.logger.log.info(`NUMERO DE CPUS ===> ${numCPUs}`);
    logger_1.logger.log.info(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker) => {
        logger_1.logger.log.error(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    server_1.default.listen(port, () => logger_1.logger.log.info(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`.green));
}
// myServer.listen(port, () => logger.log.info(`SERVER UP IN PORT ${port}`.green));
// myServer.on('error', (err) => {
//   logger.log.error('SERVER ERROR: '.red, err);
// });
// Imprimo en Consola el código de salida
process.on('exit', (code) => {
    logger_1.logger.log.error(`Exit ==> El proceso termino con codigo ${code}\n\n`);
});
