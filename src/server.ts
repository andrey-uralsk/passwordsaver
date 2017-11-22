import 'reflect-metadata';
import * as Koa from 'koa';
import * as bodyParser from "koa-bodyparser";
import {createConnection} from 'typeorm';
import { config } from "./config/config";
import { privateRoutes, publicRoutes } from './middleware/routes';
import { logger } from "./middleware/logger";
import * as passport from "koa-passport";
import {passportJwt} from "./authentication/passportJwt";

createConnection(config.dbConnection).then(async () => {
    const app = new Koa();
    app.use(bodyParser());
    app.use(logger);
    app.use(passport.initialize());
    app.use(publicRoutes);
    app.use(passportJwt);
    app.use(privateRoutes);
    app.listen(config.port);
    console.log(`server running on port ${config.port}`);
}).catch(error => console.log(`TypeORM connection error: ${error}`));