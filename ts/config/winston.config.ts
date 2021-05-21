import winston from 'winston';

const logConf = {
  transports: [
    new winston.transports.File({
      level: 'error',
      filename:'./ts/logs/error.log'
    }),
    new winston.transports.File({
      level: 'warn',
      filename:'./ts/logs/warn.log'
    }),
    new winston.transports.Console({
      level: 'info'
    })
  ]
}

const logger = winston.createLogger(logConf)

export {
  logger,
}
