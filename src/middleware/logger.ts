// require Log4js
import winston from 'winston';
// Create the logger

const { createLogger, format, transports } = winston;
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
  logConfiguration = {
    level: 'silly',
    format: combine(
      colorize({ all: true }),
      timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      label({ label: 'ProyectoCoderhouse' })
    ),
    transports: [
      new winston.transports.Console({ format: combine(myFormat) }),
      new winston.transports.File({
        filename: process.cwd() + '/assets/warn.log',
        level: 'warn',
        format: combine(warnFilter(), myFormat)
      }),
      new winston.transports.File({
        filename: process.cwd() + '/assets/error.log',
        level: 'error',
        format: combine(errorFilter(), myFormat)
      })
    ]
  };

  //Recibo Los Logs y los envio a su destino
  log = createLogger(this.logConfiguration);

  //Test Logs
  //   log.silly('Imprimimos Silly');
  //   log.debug('Imprimimos Debug');
  //   log.verbose('Imprimimos Verbose');
  //   log.info('Imprimimos Info');
  //   log.warn('Imprimimos Warn');
  //   log.error('Imprimimos Error');
}

export const logger = new Logger();
