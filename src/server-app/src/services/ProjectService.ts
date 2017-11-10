import {Project} from "../db/entity/Project";
import {getManager} from "typeorm";

export class ProjectService {

    public async getAllProjects(): Promise<Project[]> {
        try {
            const projectRepository = getManager().getRepository(Project);
            return await projectRepository.find();
        }catch(err) {
            console.log(err);
        }
    }

    public async getProjectById(projectId: number): Promise<Project> {
        try {
            const projectRepository = getManager().getRepository(Project);
            return await projectRepository.findOneById(projectId);
        } catch (err) {
            console.log(err);
        }
    }

    public async addProject(newProject: Project): Promise<Project> {
        try {
            const projectRepository = getManager().getRepository(Project);
            const createProject = projectRepository.create(newProject);
            return await projectRepository.save(createProject);
        } catch (err) {
            console.log(err);
        }
    }

    public async updateProject(projectId: number, project: Project) {
        try {
            const projectRepository = getManager().getRepository(Project);
            const oldProject = await projectRepository.findOneById(projectId);
            const updateProject = Object.assign(oldProject, project);
            return await projectRepository.save(updateProject);
        } catch (err) {
            console.log(err);
        }
    }

    public async deleteProject(projectId: number) {
        try {
            const projectRepository = getManager().getRepository(Project);
            const deleteProject = await projectRepository.findOneById(projectId);
            return await projectRepository.remove(deleteProject);
        } catch (err) {
            console.log(err);
        }
    }
}