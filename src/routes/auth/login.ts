import * as Router from 'koa-router';
import {UserService} from "../../services/UserService";
import * as jwt from "jsonwebtoken";
import {config} from "../../config/config";
import * as bcrypt from 'bcrypt';


const router = new Router();
const LOGIN_URL = `/api/login`;

router.post(`${LOGIN_URL}`, async (ctx) => {
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
        if(!user.isActive) {
            ctx.status = 401;
            ctx.body = {
                message:"you banned"
            };
        }
        if(await bcrypt.compare(authUser.password, user.password)) {
            const payload = {id: user.id};
            const token = jwt.sign(payload, config.jwtOptions.secretOrKey, config.tokenOption);
            ctx.body = {
                status: "success",
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

export const loginRouter = router.routes();