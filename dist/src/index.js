"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const sockets_1 = __importDefault(require("./services/sockets"));
const config_1 = __importDefault(require("./config"));
const port = config_1.default.PORT;
(0, sockets_1.default)(server_1.default);
server_1.default.listen(port, () => console.log(`SERVER UP IN PORT ${port}`));
server_1.default.on('error', (err) => {
    console.log('SERVER ERROR: ', err);
});
