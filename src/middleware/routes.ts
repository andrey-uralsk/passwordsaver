import * as Router from 'koa-router';
//import routes
import {projectsRoutes} from "../routes/projects";
import {passwordsRoutes} from "../routes/passwords";
import {passwordTypesRoutes} from "../routes/passwordTypes";
import {authRouter} from "../routes/authentication";

const privateRouter = new Router();
privateRouter.use(projectsRoutes);
privateRouter.use(passwordsRoutes);
privateRouter.use(passwordTypesRoutes);
const publicRouter = new Router();
publicRouter.use(authRouter);

publicRouter.get('/', async (ctx) => {
    ctx.body = `Hello api!`;
});

export const privateRoutes = privateRouter.routes();
export const publicRoutes = publicRouter.routes();