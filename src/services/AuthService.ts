import * as Jwt from "jsonwebtoken";
import * as Koa from 'koa';
import * as passport from "koa-passport";
import * as PassportJwt from "passport-jwt";
import {UserService} from "./UserService";
import {config} from "../config/config";

const ExtractJwt = PassportJwt.ExtractJwt;
const JwtStrategy = PassportJwt.Strategy;

let jwtStrategy = new JwtStrategy(config.jwtOptions, (jwtPayload, done) => {
    const userService: UserService = new UserService();
    const user = userService.getUserById(jwtPayload.id);
    if(user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

passport.use(jwtStrategy);

export const passportJwt = passport.authenticate('jwt', {session: false});