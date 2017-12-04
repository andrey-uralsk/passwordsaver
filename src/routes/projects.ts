import * as Router from 'koa-router';
import {ProjectService} from "../services/ProjectService";

const router = new Router();
const PROJECTS_URL = `/api/projects`;

router.get(PROJECTS_URL, async (ctx) => {
    try {
        const projectService = new ProjectService();
        if(ctx.request.query.id) {
            const project = await projectService.getProjectById(ctx.request.query.id);
            ctx.body = {
                data: project
            };
        } else {
            const projects = await projectService.getAllProjects();
            ctx.body = {
                data: projects
            };
        }
        ctx.body.status = 'success';

    } catch (err) {
        console.log(err);
    }
});

router.post(PROJECTS_URL, async (ctx) => {
    try {
        const projectService = new ProjectService();
        const newProject = projectService.addProject(ctx.request.body);
        if(newProject) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: newProject
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

router.put(PROJECTS_URL, async (ctx) => {
    try {
        const projectService = new ProjectService();
        const updateProject = await projectService.updateProject(ctx.request.body.id, ctx.request.body);
        if(updateProject) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: updateProject
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

router.delete(PROJECTS_URL, async (ctx) => {
    try {
        const projectService = new ProjectService();
        const deletedProject = await projectService.deleteProject(ctx.request.body.id);
        if(deletedProject) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: deletedProject
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

export const projectsRoutes = router.routes();