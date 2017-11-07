import * as Router from 'koa-router';
import {projectsRoutes} from "../routes/projects";
import {getManager} from "typeorm";
import {User} from "../db/entity/User";
import {passwordsRoutes} from "../routes/passwords";

const router = new Router();
router.use(projectsRoutes);
router.use(passwordsRoutes);

router.get('/', async (ctx) => {
    ctx.body = 'Hello world!';
});

router.get('/test', async (ctx) =>{
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();
    ctx.status = 200;
    ctx.body = users;
});

router.get('/lol', async (ctx) =>{
    const userRepository = getManager().getRepository(User);

    const newUser = userRepository.create({firstName: 'Andrey', lastName: "Karnaukhov", age: 26});

    await userRepository.save(newUser);

    ctx.body = newUser;
});

export const routes = router.routes();