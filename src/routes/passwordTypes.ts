import * as Router from 'koa-router';
import {PasswordTypeService} from "../services/PasswordTypeService";

const router = new Router();
const PASSWORDS_TYPES_URL = `/api/passwordTypes`;

router.get(PASSWORDS_TYPES_URL, async (ctx) => {
    try {
        const passwordTypeService = new PasswordTypeService();
        const passwordType = await passwordTypeService.getAllPasswordTypes();
        ctx.body = {
            status: 'success',
            data: passwordType
        };
    } catch (err) {
        console.log(err);
    }
});

router.get(`${PASSWORDS_TYPES_URL}/:passwordTypesId`, async (ctx) => {
    try {
        const passwordTypeService = new PasswordTypeService();
        const passwordType = await passwordTypeService.getPasswordTypeById(ctx.params.id);
        if (passwordType) {
            ctx.body = {
                status: 'success',
                data: passwordType
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: "error",
                data: "Project not found"
            }
        }
    } catch (err) {
        console.log(err);
    }
});

router.post(PASSWORDS_TYPES_URL, async (ctx) => {
    try {
        const passwordTypeService = new PasswordTypeService();
        const passwordType = passwordTypeService.addPasswordType(ctx.request.body);
        if(passwordType) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: passwordType
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

router.put(`${PASSWORDS_TYPES_URL}/:passwordTypesId`, async (ctx) => {
    try {
        const passwordTypeService = new PasswordTypeService();
        const updatePasswordType = await passwordTypeService.updatePasswordType(ctx.params.id, ctx.request.body);
        if(updatePasswordType) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: updatePasswordType
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

router.delete(`${PASSWORDS_TYPES_URL}/:passwordTypesId`, async (ctx) => {
    try {
        const passwordTypeService = new PasswordTypeService();
        const deletedPasswordType = await passwordTypeService.deletePasswordType(ctx.params.id);
        if(deletedPasswordType) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: deletedPasswordType
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

export const passwordTypesRoutes = router.routes();