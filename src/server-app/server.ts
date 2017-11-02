import * as Koa from 'koa';
import { config } from "./src/config/config";
import { routes } from './src/middleware/routes';
import { logger } from "./src/middleware/logger";

const app = new Koa();
app.use(logger);
app.use(routes);
app.listen(config.port);

console.log(`server running on port ${config.port}`);