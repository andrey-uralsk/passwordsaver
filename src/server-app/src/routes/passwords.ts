import * as Router from 'koa-router';
import {getManager, getRepository} from "typeorm";
import {Password} from "../db/entity/Password";

const router = new Router();
const PASSWORDS_URL = `/api/passwords`;

router.get(PASSWORDS_URL, async (ctx) => {
    try {
        const passwordRepository = getManager().getRepository(Password);
        const passwords = await passwordRepository.find();
        ctx.body = {
            status: 'success',
            data: passwords
        };
    } catch (err) {
        console.log(err);
    }
});

router.get(`${PASSWORDS_URL}/:projectId`, async (ctx) => {
    try {
        const passwordRepository = getManager().getRepository(Password);
        const passwords = await passwordRepository.findOneById(ctx.params.projectId);
        if (passwords) {
            ctx.body = {
                status: 'success',
                data: passwords
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: "error",
                data: "Passwords not found"
            }
        }
    } catch (err) {
        console.log(err);
    }
});

router.post(PASSWORDS_URL, async (ctx) => {
    try {
        const passwordRepository = getManager().getRepository(Password);
        const newPassword = passwordRepository.create(ctx.request.body);
        const savePassword = await passwordRepository.save(newPassword);
        if(savePassword) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: savePassword
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            }
        }
    }catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
});

router.put(`${PASSWORDS_URL}/:id`, async (ctx) => {
    try {
        const passwordRepository = getManager().getRepository(Password);
        let updatePassword = await passwordRepository.findOneById(ctx.params.id);
        updatePassword = Object.assign(updatePassword, ctx.request.body);
        const savePassword = await passwordRepository.save(updatePassword);
        if(savePassword) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: savePassword
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            }
        }
    }catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
});

router.delete(`${PASSWORDS_URL}/:id`, async (ctx) => {
    try {
        const passwordRepository = getManager().getRepository(Password);
        const deletePassword = await passwordRepository.findOneById(ctx.params.id);
        const deletedPassword = await passwordRepository.remove(deletePassword);
        if(deletedPassword) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: deletedPassword
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            }
        }
    }catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
});

export const passwordsRoutes = router.routes();