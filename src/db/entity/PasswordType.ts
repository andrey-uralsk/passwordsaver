import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Password} from "./Password";

@Entity()
export class PasswordType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Password, pasword => pasword.passwordType)
    passwords: Password[];
}