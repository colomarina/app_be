"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const session = require("../controller/session.controller");
let routerSession = express_1.Router();
// Passport
routerSession.get("/", session.goLogin);
// LOGIN
routerSession.get("/login", session.getLogin);
routerSession.post("/login", passport_1.default.authenticate('login', {
    failureRedirect: 'faillogin'
}), session.postLogin);
routerSession.get("/faillogin", session.getFaillogin);
// REGISTER
routerSession.get("/register", session.getSingup);
routerSession.post("/register", passport_1.default.authenticate('singup', {
    failureRedirect: 'failsingup'
}), session.postSingup);
routerSession.get("/failsingup", session.getFailsingup);
// LOGOUT
routerSession.get("/logout", session.getLogout);
// LOGIN CON FACEBOOK
routerSession.get("/auth/facebook", passport_1.default.authenticate('facebook'));
routerSession.get("/auth/facebook/callback", passport_1.default.authenticate('facebook', {
    failureRedirect: '/login'
}), session.getLoginFacebook);
// FAIL ROUTE
routerSession.get("*", session.failRoute);
exports.default = routerSession;
