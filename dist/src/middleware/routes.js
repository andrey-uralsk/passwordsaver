"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get('/', async (ctx) => {
    ctx.body = 'Hello world!';
});
router.get('/test', async (ctx) => {
    ctx.status = 200;
    ctx.body = "TEST";
});
exports.routes = router.routes();
//# sourceMappingURL=routes.js.map