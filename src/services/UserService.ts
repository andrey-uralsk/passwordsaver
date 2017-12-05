import {getManager, Repository} from "typeorm";
import {User} from "../db/entity/User";
import * as bcrypt from 'bcrypt';

export class UserService {
    private userRepository: Repository<User> = getManager().getRepository(User);

    public async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        }catch(err) {
            console.log(err);
        }
    }

    public async getUserById(userId: number): Promise<User> {
        try {
            return await this.userRepository.findOneById(userId);
        } catch (err) {
            console.log(err);
        }
    }

    public async getUserByEmail(userEmail: string): Promise<User> {
        try {
            return await this.userRepository.findOne({email : userEmail});
        } catch (err) {
            console.log(err);
        }
    }

    public async addUser(newUser: User): Promise<User> {
        try {
            const salt = await bcrypt.genSalt(8);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            const createUser = this.userRepository.create(newUser);
            return await this.userRepository.save(createUser);
        } catch (err) {
            console.log(err);
        }
    }

    public async updateUser(userId: number, user: User) {
        try {
            const oldUser = await this.userRepository.findOneById(userId);
            const updateUser = Object.assign(oldUser, user);
            return await this.userRepository.save(updateUser);
        } catch (err) {
            console.log(err);
        }
    }

    public async deleteUser(userId: number) {
        try {
            const deleteUser = await this.userRepository.findOneById(userId);
            return await this.userRepository.remove(deleteUser);
        } catch (err) {
            console.log(err);
        }
    }
}