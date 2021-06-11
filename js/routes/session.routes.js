"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const { login, signup, getProfile, logout, loginFacebook } = require('../controller/login');
let routerSession = express_1.Router();
routerSession.post("/singup", passport_1.default.authenticate('signup', { session: false }), login);
routerSession.post("/login", signup);
routerSession.post("/logout", logout);
routerSession.get("/profile", passport_1.default.authenticate('jwt', { session: false }), getProfile);
// LOGIN CON FACEBOOK
routerSession.get("/auth/facebook", passport_1.default.authenticate('facebook'));
routerSession.get("/auth/facebook/callback", passport_1.default.authenticate('facebook', {
    failureRedirect: '/login'
}), loginFacebook);
exports.default = routerSession;
