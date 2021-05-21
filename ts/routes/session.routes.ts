import { Router } from "express";
import passport from "passport";
const session = require( "../controller/session.controller");
let routerSession = Router();

// Passport
routerSession.get("/", session.goLogin);

// LOGIN
routerSession.get("/login", session.getLogin);

routerSession.post("/login", passport.authenticate('login', {
  failureRedirect: 'faillogin'
}) ,session.postLogin);

routerSession.get("/faillogin", session.getFaillogin);
// REGISTER
routerSession.get("/register", session.getSingup);

routerSession.post("/register", passport.authenticate('singup', {
  failureRedirect: 'failsingup'
}) ,session.postSingup);

routerSession.get("/failsingup", session.getFailsingup);
// LOGOUT
routerSession.get("/logout", session.getLogout);
// LOGIN CON FACEBOOK
routerSession.get("/auth/facebook", passport.authenticate('facebook'));

routerSession.get("/auth/facebook/callback", passport.authenticate('facebook', {
  failureRedirect: '/login'
}), session.getLoginFacebook);
// FAIL ROUTE
routerSession.get("*", session.failRoute);




export default routerSession;