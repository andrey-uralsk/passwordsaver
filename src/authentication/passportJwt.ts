import * as Jwt from "jsonwebtoken";
import * as Koa from 'koa';
import {Request} from "express";
import * as passport from "koa-passport";
import * as PassportJwt from "passport-jwt";
import {UserService} from "../services/UserService";
import {config} from "../config/config";
import {VerifiedCallback, VerifyCallbackWithRequest} from "passport-jwt";

const ExtractJwt = PassportJwt.ExtractJwt;
const JwtStrategy = PassportJwt.Strategy;

let jwtStrategy = new JwtStrategy(config.jwtOptions, async (payload: any, done: VerifiedCallback) => {
    const userService: UserService = new UserService();
    const user = await userService.getUserById(payload.id);
    if(user && user.isActive) {
        done(null, user);
    } else {
        done(null, false);
    }
});

passport.use(jwtStrategy);

export const passportJwt = passport.authenticate('jwt', {session: false});