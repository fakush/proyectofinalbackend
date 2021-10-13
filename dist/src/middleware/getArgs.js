"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbClientSecretArgument = exports.fbClientIdArgument = exports.portArgument = exports.allArguments = void 0;
const minimist_1 = __importDefault(require("minimist"));
const args = (0, minimist_1.default)(process.argv.slice(2));
if (args.h)
    console.log('Argumentos validos: port=NUMBER - fbClientId=FACEBOOK_CLIENT_ID - fbClientSecret=FACEBOOK_CLIENT_SECRET');
exports.allArguments = args;
exports.portArgument = args.port;
exports.fbClientIdArgument = args.fbClientId;
exports.fbClientSecretArgument = args.fbClientSecret;
