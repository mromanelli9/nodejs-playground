import { ParameterizedContext, Next, Middleware } from 'koa';
import logger from '../modules/logger';

/**
 * Creates a middleware to perform a basic logging of API calls
 *
 * @returns {Middleware}  Koa middleware
 *
 * @example
 * ```typescript
 * import * as Koa from 'koa';
 *
 * const app = new Koa();
 *
 * app.use(loggerMiddleware());
 *
 * app.use((ctx) => {
 *   ctx.body = 'Hello, Koa!';
 * });
 *
 * app.listen(3000);
 * ```
 */
const loggerMiddleware = (): Middleware => {
  const middleware = async (ctx: ParameterizedContext, next: Next): Promise<void> => {
    const loggerMeta = { service: 'api' };

    // Log request
    logger.info(`REQ ${ctx.method} ${ctx.originalUrl}`, loggerMeta);

    // Pass code flow to following middlewares
    try {
      await next();
    } catch (err) {
      // Log uncaught downstream errors
      logger.error(err);
      throw err;
    }

    // Log when the response is finished or closed, whichever happens first
    logger.info(`RESP ${ctx.method} ${ctx.originalUrl} ${ctx.status}`, loggerMeta);
  };

  return middleware;
};

export default loggerMiddleware;
