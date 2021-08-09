import passport from "passport";
import { userFacebookModel } from '../db/models/userFacebook.model';
import validate from "../middleware/validations";
import { logger } from "./winston.config";
const config = require('../config/config');
const UserModel = require('../db/models/user');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const strategyOptionsFacebook = {
  clientID: config.FACEBOOK_CLIENT_ID,
  clientSecret: config.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email' , 'picture.type(large)'],
  scope: ["email"],
  enableProof: true,
}

const strategyJWT = {
  secretOrKey: 'TOP_SECRET',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

const signup = async (req: any, email: any, password: any, done: any) => {
  const { passwordConfirm, nombreCompleto, celular, admin } = req.body;
  // const x  = validate({ email, password, passwordConfirm, nombreCompleto, celular, admin })
  // console.log(x);
  try {
    const user = await UserModel.create({ email, password, nombreCompleto, celular, admin });
    return done(null, user);
  } catch (error) {
    console.log(error)
    logger.error(error)
    return done(error);
  }
};

const login = async (req: any, email: String, password: any, done: any) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    const validate = await user.isValidPassword(password);

    if (!validate) {
      return done(null, false, { message: 'Contraseña erronea' });
    }

    return done(null, user, { message: 'Logueado con éxito' });
  } catch (error) {
    logger.error(error)
    return done(error);
  }
};

const loginFacebook = async (accessToken:any, refreshToken:any, profile:any, cb:any) => {
  const findOrCreate = () => {
    userFacebookModel.findOne({ 'facebookId': profile.id }, (err: any, user: any) => {
      if (err) {
        return cb(err);
      }
      if (user) {
        return cb(null, user)
      } else {
        let newUser = new userFacebookModel();
        newUser.facebookId = profile.id;
        newUser.username = profile._json.name;
        newUser.email = profile._json.email;
        newUser.photo = profile._json.picture.data.url;
        newUser.save((err: any) => {
          if (err) {
            throw err;
          }
          return cb(null, newUser)
        })
      }
    })
  }
  process.nextTick(findOrCreate);
};

// Passport middleware to handle user registration

passport.use('signup', new localStrategy(strategyOptions, signup));

// Passport middleware to handle user login

passport.use('login', new localStrategy(strategyOptions, login));

// Passport middleware to handle user loginFacebook

passport.use('facebook',new FacebookStrategy(strategyOptionsFacebook, loginFacebook))

passport.use(
  new JWTstrategy(strategyJWT, async (token: any, done : any) => {
    try {
      return done(null, token.user);
    } catch (error) {
      logger.error(error)
      done(error);
    }
  }
  )
);


export const inicializarPassport = passport.initialize()

export const sessionPassport = passport.session()
