import * as Router from 'koa-router';
//import routes
import {projectsRoutes} from "../routes/projects";
import {passwordsRoutes} from "../routes/passwords";
import {passwordTypesRoutes} from "../routes/passwordTypes";

const router = new Router();
router.use(projectsRoutes);
router.use(passwordsRoutes);
router.use(passwordTypesRoutes);

router.get('/', async (ctx) => {
    ctx.body = `Hello api!`;
});

export const routes = router.routes();