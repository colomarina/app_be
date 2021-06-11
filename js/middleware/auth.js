"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const winston_config_1 = require("../config/winston.config");
const UserModel = require('../model/user');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password'
};
const strategyJWT = {
    secretOrKey: 'TOP_SECRET',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};
const signup = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.create({ email, password });
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
});
const login = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const validate = yield user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
    }
    catch (error) {
        winston_config_1.logger.error(error);
        return done(error);
    }
});
// Passport middleware to handle user registration
passport_1.default.use('signup', new localStrategy(strategyOptions, signup));
// Passport middleware to handle user login
passport_1.default.use('login', new localStrategy(strategyOptions, login));
passport_1.default.use(new JWTstrategy(strategyJWT, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
})));
