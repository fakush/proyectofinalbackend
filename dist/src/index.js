"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const server_1 = __importDefault(require("./services/server"));
const sockets_1 = __importDefault(require("./services/sockets"));
const config_1 = __importDefault(require("./config"));
const getArgs_1 = require("./middleware/getArgs");
colors_1.default.enable();
const port = getArgs_1.portArgument || config_1.default.PORT;
(0, sockets_1.default)(server_1.default);
server_1.default.listen(port, () => console.log(`SERVER UP IN PORT ${port}`.green));
server_1.default.on('error', (err) => {
    console.log('SERVER ERROR: '.red, err);
});
// Imprimo en Consola el código de salida
process.on('exit', (code) => {
    console.log(`Exit ==> El proceso termino con codigo ${code}\n\n`);
});
