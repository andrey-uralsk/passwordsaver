import * as Router from 'koa-router';
//import routes
import {projectsRoutes} from "../routes/projects";
import {passwordsRoutes} from "../routes/passwords";
import {passwordTypesRoutes} from "../routes/passwordTypes";
import {loginRouter} from "../routes/auth/login";
import {authRouter} from "../routes/auth/auth";
import {registrationRouter} from "../routes/auth/registration";

const privateRouter = new Router();
privateRouter.use(projectsRoutes);
privateRouter.use(passwordsRoutes);
privateRouter.use(passwordTypesRoutes);
privateRouter.use(authRouter);
const publicRouter = new Router();
publicRouter.use(loginRouter);
publicRouter.use(registrationRouter);

publicRouter.get('/', async (ctx) => {
    ctx.body = `Hello api!`;
});

export const privateRoutes = privateRouter.routes();
export const publicRoutes = publicRouter.routes();