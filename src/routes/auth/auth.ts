import * as Router from 'koa-router';

const router = new Router();
const AUTH_URL = `/api/auth`;

router.get(`${AUTH_URL}/isAuth`, async (ctx) => {
    ctx.status = 200;
    if(ctx.isAuthenticated()) {
        ctx.body = {
            isAuth: true
        };
        console.log(`isAuth true`);
    } else {
        ctx.body = {
            isAuth: false
        };
        console.log(`isAuth false`);
    }
});

export const authRouter = router.routes();