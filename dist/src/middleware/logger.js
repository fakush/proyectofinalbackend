"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// require Log4js
const winston_1 = __importDefault(require("winston"));
// Create the logger
const { createLogger, format, transports } = winston_1.default;
const { combine, printf, timestamp, colorize, label } = format;
const warnFilter = format((info) => {
    return info.level.includes('warn') ? info : false;
});
const errorFilter = format((info) => {
    return info.level.includes('error') ? info : false;
});
const myFormat = printf((info) => {
    // you can get splat attribue here as info[Symbol.for("splat")]
    // if you custome splat please rem splat() into createLogger()
    // https://stackoverflow.com/a/54196485/8268522
    return `[${info.label}] ${info.timestamp} | ${info.level}: ${info.message}`;
});
class Logger {
    constructor() {
        this.logConfiguration = {
            level: 'info',
            format: combine(colorize({ all: true }), timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), label({ label: 'ProyectoCoderhouse' }), myFormat),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    filename: '../../logs/warn.log',
                    level: 'warn',
                    format: combine(warnFilter(), timestamp(), myFormat)
                }),
                new winston_1.default.transports.File({
                    filename: '../../logs/error.log',
                    level: 'error',
                    format: combine(errorFilter(), timestamp(), myFormat)
                })
            ]
        };
        //Recibo Los Logs y los envio a su destino
        this.log = createLogger(this.logConfiguration);
        //Test Logs
        //   log.silly('Imprimimos Silly');
        //   log.debug('Imprimimos Debug');
        //   log.verbose('Imprimimos Verbose');
        //   log.info('Imprimimos Info');
        //   log.warn('Imprimimos Warn');
        //   log.error('Imprimimos Error');
    }
}
exports.logger = new Logger();
