import * as Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello world!';
});

router.get('/test', async (ctx) =>{
    ctx.status = 200;
    ctx.body = "TEST";
});

export const routes = router.routes();