import {getManager, Repository} from "typeorm";
import {Password} from "../db/entity/Password";

export class PasswordService {

    private passwordRepository: Repository<Password> = getManager().getRepository(Password);

    public async getAllPasswords(): Promise<Password[]> {
        try {
            return await this.passwordRepository.find({relations: ['project', 'passwordType']});
        }catch(err) {
            console.log(err);
        }
    }

    public async getPasswordsByProjectId(projectId: number): Promise<Password[]> {
        try {
            return await this.passwordRepository.find({where: {project: {id: projectId}}, relations: ['passwordType']});
        } catch (err) {
            console.log(err);
        }
    }

    public async addPassword(newPassword: Password): Promise<Password> {
        try {
            const createPassword = this.passwordRepository.create(newPassword);
            return await this.passwordRepository.save(createPassword);
        } catch (err) {
            console.log(err);
        }
    }

    public async updatePassword(passwordId: number, password: Password) {
        try {
            const oldPassword = await this.passwordRepository.findOneById(passwordId);
            const updatePassword = Object.assign(oldPassword, password);
            return await this.passwordRepository.save(updatePassword);
        } catch (err) {
            console.log(err);
        }
    }

    public async deletePassword(passwordId: number) {
        try {
            const deletePassword = await this.passwordRepository.findOneById(passwordId);
            return await this.passwordRepository.remove(deletePassword);
        } catch (err) {
            console.log(err);
        }
    }
}