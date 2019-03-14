import { createServer } from 'http';
import * as next from 'next';
import { parse } from 'url';

import { routes } from './routes';

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url as string, true);

    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
