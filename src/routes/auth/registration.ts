import * as Router from 'koa-router';
import {UserService} from "../../services/UserService";
import * as jwt from "jsonwebtoken";
import {config} from "../../config/config";
import * as bcrypt from 'bcrypt';


const router = new Router();
const REGISTRATION_URL = `/api/registration`;

router.post(`${REGISTRATION_URL}`, async (ctx) => {
    const registrationUser = ctx.request.body;
    if(registrationUser.email && registrationUser.password) {
        const userService = new UserService();
        const user = await userService.addUser(registrationUser);
        if(user) {
            const payload = {id: user.id};
            const token = jwt.sign(payload, config.jwtOptions.secretOrKey, config.tokenOption);
            ctx.status = 200;
            ctx.body = {
                message:"Success",
                data: user,
                token: token
            };
        }
    }
});

export const registrationRouter = router.routes();