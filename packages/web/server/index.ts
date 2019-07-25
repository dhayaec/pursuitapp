import * as fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as Next from 'next';
import { parse } from 'url';
import { routes } from './routes';

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: { level: 'error' } });

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

server.register(require('fastify-compress'), { global: false });

server.register((server, _, next) => {
  const app = Next({ dev });
  const handle = routes.getRequestHandler(app);
  app
    .prepare()
    .then(() => {
      if (dev) {
        server.get('/_next/*', (req, reply) => {
          return app.handleRequest(req.req, reply.res).then(() => {
            reply.sent = true;
          });
        });
      }

      server.get('*', (req, reply) => {
        const parsedUrl = parse(req.req.url as string, true);
        return handle(req.req, reply.res, parsedUrl);
      });

      server.setNotFoundHandler((req, reply) => {
        const parsedUrl = parse(req.req.url as string, true);
        return handle(req.req, reply.res, parsedUrl);
      });

      next();
    })
    .catch(err => next(err));
});

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
