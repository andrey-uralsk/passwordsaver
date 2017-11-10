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

    @Column({type: "text", nullable: true})
    description: string;

    @ManyToOne(type => Project, project => project.passwords)
    project: Project;

    @ManyToOne(type => PasswordType, passwordType => passwordType.passwords)
    passwordType: PasswordType;
}