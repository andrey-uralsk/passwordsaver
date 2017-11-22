import * as Router from 'koa-router';
import {UserService} from "../services/UserService";
import * as jwt from "jsonwebtoken";
import {config} from "../config/config";

const router = new Router();
const AUTH_URL = `/auth`;

router.post(`${AUTH_URL}/login`, async (ctx) => {
    const authUser = ctx.request.body;
    if(authUser.email && authUser.password) {
        const userService = new UserService();
        const user = await userService.getUserByEmail(authUser.email);
        if(!user) {
            ctx.status = 401;
            ctx.body = {
                message:"no such user found"
            };
        }
        if(user.password === authUser.password) {
            const payload = {id: user.id};
            const token = jwt.sign(payload, config.jwtOptions.secretOrKey);
            ctx.body = {
                status: "succes",
                token: token
            }
        } else {
            ctx.status = 401;
            ctx.body = {
                message:"passwords did not match"
            };
        }

    }
});

export const authRouter = router.routes();