import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Project} from "./Project";
import {PasswordType} from "./PasswordType";

@Entity()
export class Password {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @ManyToOne(type => Project, project => project.passwords)
    project: Project;

    @ManyToOne(type => PasswordType, passwordType => passwordType.passwords)
    passwordType: PasswordType;
}