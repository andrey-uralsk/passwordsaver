import {Project} from "../db/entity/Project";
import {getManager, Repository} from "typeorm";

export class ProjectService {


    private projectRepository: Repository<Project> = getManager().getRepository(Project);

    public async getAllProjects(): Promise<Project[]> {
        try {
            return await this.projectRepository.find();
        }catch(err) {
            console.log(err);
        }
    }

    public async getProjectById(projectId: number): Promise<Project> {
        try {
            return await this.projectRepository.findOneById(projectId);
        } catch (err) {
            console.log(err);
        }
    }

    public async addProject(newProject: Project): Promise<Project> {
        try {
            const createProject = this.projectRepository.create(newProject);
            return await this.projectRepository.save(createProject);
        } catch (err) {
            console.log(err);
        }
    }

    public async updateProject(projectId: number, project: Project) {
        try {
            const oldProject = await this.projectRepository.findOneById(projectId);
            const updateProject = Object.assign(oldProject, project);
            return await this.projectRepository.save(updateProject);
        } catch (err) {
            console.log(err);
        }
    }

    public async deleteProject(projectId: number) {
        try {
            const deleteProject = await this.projectRepository.findOneById(projectId);
            return await this.projectRepository.remove(deleteProject);
        } catch (err) {
            console.log(err);
        }
    }
}