import * as nextRoutes from 'next-routes';

// @ts-ignore
export const routes = nextRoutes().add('category', '/category/:slug?');
