import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Password} from "./Password";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Password, password => password.project)
    passwords: Password[];
}