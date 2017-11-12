import 'reflect-metadata';
import * as Koa from 'koa';
import * as bodyParser from "koa-bodyparser";
import {createConnection} from 'typeorm';
import { config } from "./config/config";
import { routes } from './middleware/routes';
import { logger } from "./middleware/logger";

createConnection(config.dbConnection).then(async () => {
    const app = new Koa();
    app.use(bodyParser());
    app.use(logger);
    app.use(routes);
    app.listen(config.port);
    console.log(`server running on port ${config.port}`);
}).catch(error => console.log(`TypeORM connection error: ${error}`));