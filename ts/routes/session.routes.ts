import { Router } from "express";
import passport from "passport";
const { login, signup, getProfile, logout, loginFacebook } = require('../controller/login');
let routerSession = Router();

routerSession.post("/user/signup", passport.authenticate('signup', { session: false }), signup);

routerSession.post("/user/login", login);

routerSession.post("/user/logout", logout);

// LOGIN CON FACEBOOK
routerSession.get("/auth/facebook", passport.authenticate('facebook'));

routerSession.get("/auth/facebook/callback", passport.authenticate('facebook', {
  failureRedirect: '/login'
}), loginFacebook);

export default routerSession;