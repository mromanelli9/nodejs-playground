import request from 'supertest';
import Koa, { Middleware, ParameterizedContext, Next } from 'koa';
import logger from '../modules/logger';
import loggerMiddleware from './logging';

// Mock the logger module
jest.mock('../modules/logger');

describe('loggerMiddleware - logging middleware', () => {
  let app: Koa;

  beforeEach(() => {
    app = new Koa();
  });

  it('should log request and response information', async () => {
    const middleware: Middleware = loggerMiddleware();
    app.use(middleware);

    // Create a simple route for testing
    app.use(async (ctx: ParameterizedContext, next: Next) => {
      ctx.body = 'Hello, World!';
      await next();
    });

    // Simulate a request to the server
    await request(app.callback()).get('/test').expect(200).expect('Hello, World!');

    // Assertions
    expect(logger.info).toHaveBeenCalledWith('REQ GET /test', { service: 'api' });
    expect(logger.info).toHaveBeenCalledWith('RESP GET /test 200', { service: 'api' });
  });

  it('should log errors', async () => {
    const middleware: Middleware = loggerMiddleware();
    app.use(middleware);

    // Create a route that throws an error for testing error logging
    app.use(async () => {
      throw new Error('Test Error');
    });

    // Simulate a request to the server
    await request(app.callback()).get('/error').expect(500);

    // Assertions
    expect(logger.error).toHaveBeenCalledWith(new Error('Test Error'));
  });
});
