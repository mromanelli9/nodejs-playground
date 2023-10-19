import Koa, { ParameterizedContext } from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import serverConfig from '../../config/server';
import loggerMiddleware from '../../modules/middlewares/logging';

export default async function httpLoader(): Promise<Koa> {
  const app = new Koa();
  const router = new Router();

  // Display a welcome message
  router.get('/', (ctx: ParameterizedContext) => {
    ctx.body = 'Welcome to Node.js playground';
  });

  // Server health check
  router.get(serverConfig.healthCheck, (ctx: ParameterizedContext) => {
    ctx.status = 200;
  });

  // Display API version
  router.get('/version', (ctx: ParameterizedContext) => {
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      version: process.env.npm_package_version || '1.0.0',
    };
  });

  // Attach custom logger
  app.use(loggerMiddleware);

  // Security measures
  app.use(bodyParser({ enableTypes: ['json'] }));
  app.use(cors());
  app.use(helmet());

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
