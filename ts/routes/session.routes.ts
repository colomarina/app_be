import { Router } from "express";
import passport from "passport";
const { login, signup, getProfile, logout, loginFacebook } = require('../controller/login');
let routerSession = Router();

routerSession.post("/singup", passport.authenticate('signup', { session: false }), login);

routerSession.post("/login", signup);

routerSession.post("/logout", logout);

routerSession.get("/profile", passport.authenticate('jwt', { session: false }), getProfile );

// LOGIN CON FACEBOOK
routerSession.get("/auth/facebook", passport.authenticate('facebook'));

routerSession.get("/auth/facebook/callback", passport.authenticate('facebook', {
  failureRedirect: '/login'
}), loginFacebook);

export default routerSession;