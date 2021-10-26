"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("./middleware/logger");
fs_1.default.renameSync('../.env.example', './.env');
logger_1.logger.log.info('.env file created');
