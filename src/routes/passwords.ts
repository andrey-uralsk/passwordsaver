import * as Router from 'koa-router';
import {PasswordService} from "../services/PasswordService";
import {Password} from "../db/entity/Password";

const router = new Router();
const PASSWORDS_URL = `/api/passwords`;

router.get(PASSWORDS_URL, async (ctx) => {
    try {
        const passwordService = new PasswordService();
        let passwords: Password[] = [];
        if(ctx.request.query.projectId) {
            passwords = await passwordService.getPasswordsByProjectId(ctx.request.query.projectId);
        } else {
            passwords = await passwordService.getAllPasswords();
        }
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
        const passwordService = new PasswordService();
        const passwords = await passwordService.getPasswordsByProjectId(ctx.params.projectId);
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
        const passwordService = new PasswordService();
        const newPassword = passwordService.addPassword(ctx.request.body);
        if(newPassword) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: newPassword
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
        const passwordService = new PasswordService();
        let updatePassword = await passwordService.updatePassword(ctx.params.id, ctx.request.body);
        if(updatePassword) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: updatePassword
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
        const passwordService = new PasswordService();
        const deletedPassword = await passwordService.deletePassword(ctx.params.id);
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