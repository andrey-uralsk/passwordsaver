import {getManager} from "typeorm";
import {Password} from "../db/entity/Password";

export class PasswordService {

    public async getAllPasswords(): Promise<Password[]> {
        try {
            const passwordRepository = getManager().getRepository(Password);
            return await passwordRepository.find();
        }catch(err) {
            console.log(err);
        }
    }

    public async getPasswordsByProjectId(projectId: number): Promise<Password[]> {
        try {
            const passwordRepository = getManager().getRepository(Password);
            return await passwordRepository.find({project: {id: projectId}});
        } catch (err) {
            console.log(err);
        }
    }

    public async addPassword(newPassword: Password): Promise<Password> {
        try {
            const passwordRepository = getManager().getRepository(Password);
            const createPassword = passwordRepository.create(newPassword);
            return await passwordRepository.save(createPassword);
        } catch (err) {
            console.log(err);
        }
    }

    public async updatePassword(passwordId: number, password: Password) {
        try {
            const passwordRepository = getManager().getRepository(Password);
            const oldPassword = await passwordRepository.findOneById(passwordId);
            const updatePassword = Object.assign(oldPassword, password);
            return await passwordRepository.save(updatePassword);
        } catch (err) {
            console.log(err);
        }
    }

    public async deletePassword(passwordId: number) {
        try {
            const passwordRepository = getManager().getRepository(Password);
            const deletePassword = await passwordRepository.findOneById(passwordId);
            return await passwordRepository.remove(deletePassword);
        } catch (err) {
            console.log(err);
        }
    }
}