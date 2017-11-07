import * as Router from 'koa-router';
import {getManager, getRepository} from "typeorm";
import {Project} from "../db/entity/Project";

const router = new Router();
const PROJECTS_URL = `/api/projects`;

router.get(PROJECTS_URL, async (ctx) => {
    try {
        const projectRepository = getManager().getRepository(Project);
        const projects = await projectRepository.find();
        ctx.body = {
            status: 'success',
            data: projects
        };
    } catch (err) {
        console.log(err);
    }
});

router.get(`${PROJECTS_URL}/:id`, async (ctx) => {
    try {
        const projectRepository = getManager().getRepository(Project);
        const project = await projectRepository.findOneById(ctx.params.id);
        if (project) {
            ctx.body = {
                status: 'success',
                data: project
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

router.post(PROJECTS_URL, async (ctx) => {
    try {
        const projectRepository = getManager().getRepository(Project);
        console.log(ctx.request.body);
        const newProject = projectRepository.create(ctx.request.body);
        const saveProject = await projectRepository.save(newProject);
        if(saveProject) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: saveProject
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

router.put(`${PROJECTS_URL}/:id`, async (ctx) => {
    try {
        const projectRepository = getManager().getRepository(Project);
        let updateProject = await projectRepository.findOneById(ctx.params.id);
        updateProject = Object.assign(updateProject, ctx.request.body);
        const saveProject = await projectRepository.save(updateProject);
        if(saveProject) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: saveProject
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

router.delete(`${PROJECTS_URL}/:id`, async (ctx) => {
    try {
        const projectRepository = getManager().getRepository(Project);
        const deleteProject = await projectRepository.findOneById(ctx.params.id);
        const deletedProject = await projectRepository.remove(deleteProject);
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