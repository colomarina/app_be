import passport from 'passport';
import { logger } from '../config/winston.config';
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

const signup = async (email: any, password: any, done: any) => {
  try {
    const user = await UserModel.create({ email, password });

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

const login = async (email: any, password: any, done: any) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const validate = await user.isValidPassword(password);

    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }

    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    logger.error(error);
    return done(error);
  }
};

// Passport middleware to handle user registration

passport.use('signup', new localStrategy(strategyOptions, signup));

// Passport middleware to handle user login

passport.use('login', new localStrategy(strategyOptions, login));


passport.use(
  new JWTstrategy(strategyJWT, async (token: any, done : any) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
  )
);