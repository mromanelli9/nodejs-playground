export default {
  hostname: process.env.HOSTNAME || 'localhost',
  port: Number.parseInt(process.env.SERVER_PORT || '3000', 10),
  healthCheck: process.env.HEALTH_CHECK_PATH || '/health',
  environment: process.env.NODE_ENV,
  log: {
    level: process.env.LOG_LEVEL || 'info',
    filename: process.env.LOG_FILE || 'combined.log',
    errorFilename: process.env.LOG_ERROR_FILE || 'error.log',
  },
  // jwtSecret: (process.env.JWT_SECRET as string) || '',
  // api: {
  //   resultsPerPage: Number.parseInt(process.env.API_RESULTS_PER_PAGE || '8', 10),
  // },
};
