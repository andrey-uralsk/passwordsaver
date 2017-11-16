import {PasswordType} from "../db/entity/PasswordType";
import {getManager, Repository} from "typeorm";

export class PasswordTypeService {

    private passwordTypeRepository: Repository<PasswordType> = getManager().getRepository(PasswordType);

    public async getAllPasswordTypes(): Promise<PasswordType[]> {
        try {
            return await this.passwordTypeRepository.find();
        }catch(err) {
            console.log(err);
        }
    }

    public async getPasswordTypeById(passwordTypeId: number): Promise<PasswordType> {
        try {
            return await this.passwordTypeRepository.findOneById(passwordTypeId);
        } catch (err) {
            console.log(err);
        }
    }

    public async addPasswordType(newPasswordType: PasswordType): Promise<PasswordType> {
        try {
            const createPasswordType = this.passwordTypeRepository.create(newPasswordType);
            return await this.passwordTypeRepository.save(createPasswordType);
        } catch (err) {
            console.log(err);
        }
    }

    public async updatePasswordType(passwordTypeId: number, passwordType: PasswordType) {
        try {
            const oldPasswordType = await this.passwordTypeRepository.findOneById(passwordTypeId);
            const updatePasswordType = Object.assign(oldPasswordType, passwordType);
            return await this.passwordTypeRepository.save(updatePasswordType);
        } catch (err) {
            console.log(err);
        }
    }

    public async deletePasswordType(passwordTypeId: number) {
        try {
            const deletePasswordType = await this.passwordTypeRepository.findOneById(passwordTypeId);
            return await this.passwordTypeRepository.remove(deletePasswordType);
        } catch (err) {
            console.log(err);
        }
    }
}