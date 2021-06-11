require('dotenv').config()
import passport from "passport";
import { userFacebookModel } from '../db/models/userFacebook.model';
import { logger } from "./winston.config";
const UserModel = require('../db/models/user');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password'
};

const strategyOptionsFacebook = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email' , 'picture.type(large)'],
  scope: ["email"],
  enableProof: true,
}

const strategyJWT = {
  secretOrKey: 'TOP_SECRET',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

const signup = async (email: any, password: any, done: any) => {
  try {
    const user = await UserModel.create({ email, password });
    return done(null, user);
  } catch (error) {
    logger.error(error)
    done(error);
  }
};

const login = async (email: String, password: any, done: any) => {
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
