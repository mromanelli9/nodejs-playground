import Koa, { ParameterizedContext } from 'koa';
import Router from '@koa/router';
import serverConfig from '../../config/server';

export default async function httpLoader(): Promise<Koa> {
  const app = new Koa();
  const router = new Router();

  router.get(serverConfig.healthCheck, (ctx: ParameterizedContext) => {
    ctx.status = 200;
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
