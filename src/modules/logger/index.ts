import winston from 'winston';
import config from '../../config/server';

const logger = winston.createLogger({
  level: config.log.level,
  format: winston.format.json(),
  defaultMeta: { service: 'root' },
  transports: [
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: config.log.errorFilename, level: 'error' }),
  ],
});

// If in productions, write all logs with importance level of `info` or less to `config.log.filename`
// Otherwise (dev/stage), log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest })`
if (config.environment === 'production') {
  logger.add(new winston.transports.File({ filename: config.log.filename }));
} else {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json(),
    })
  );
}

export default logger;
