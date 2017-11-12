import {PasswordType} from "../db/entity/PasswordType";
import {getManager} from "typeorm";

export class PasswordTypeService {
    public async getAllPasswordTypes(): Promise<PasswordType[]> {
        try {
            const passwordTypeRepository = getManager().getRepository(PasswordType);
            return await passwordTypeRepository.find();
        }catch(err) {
            console.log(err);
        }
    }

    public async getPasswordTypeById(passwordTypeId: number): Promise<PasswordType> {
        try {
            const passwordTypeRepository = getManager().getRepository(PasswordType);
            return await passwordTypeRepository.findOneById(passwordTypeId);
        } catch (err) {
            console.log(err);
        }
    }

    public async addPasswordType(newPasswordType: PasswordType): Promise<PasswordType> {
        try {
            const passwordTypeRepository = getManager().getRepository(PasswordType);
            const createPasswordType = passwordTypeRepository.create(newPasswordType);
            return await passwordTypeRepository.save(createPasswordType);
        } catch (err) {
            console.log(err);
        }
    }

    public async updatePasswordType(passwordTypeId: number, passwordType: PasswordType) {
        try {
            const passwordTypeRepository = getManager().getRepository(PasswordType);
            const oldPasswordType = await passwordTypeRepository.findOneById(passwordTypeId);
            const updatePasswordType = Object.assign(oldPasswordType, passwordType);
            return await passwordTypeRepository.save(updatePasswordType);
        } catch (err) {
            console.log(err);
        }
    }

    public async deletePasswordType(passwordTypeId: number) {
        try {
            const passwordTypeRepository = getManager().getRepository(PasswordType);
            const deletePasswordType = await passwordTypeRepository.findOneById(passwordTypeId);
            return await passwordTypeRepository.remove(deletePasswordType);
        } catch (err) {
            console.log(err);
        }
    }
}