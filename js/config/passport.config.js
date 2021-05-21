"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionPassport = exports.inicializarPassport = exports.checkAuthentication = void 0;
const passport_1 = __importDefault(require("passport"));
const index_db_1 = require("../db/index.db");
const user_model_1 = require("../db/models/user.model");
const userFacebook_model_1 = require("../db/models/userFacebook.model");
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_CLIENT_ID = '1833584373478234';
const FACEBOOK_CLIENT_SECRET = 'c64f741c6c4e75fdd580162fd59d3d86';
passport_1.default.use('login', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    user_model_1.userModel.findOne({ 'username': username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            // console.log(`User Not Found with username: ${username}`);
            return done(null, false, console.log('message', 'User Not Found'));
        }
        if (!index_db_1.isValidPassword(user, password)) {
            // console.log('Invalid Password');
            return done(null, false, console.log('message', 'Invalid Password'));
        }
        return done(null, user);
    });
}));
passport_1.default.use('singup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    const findOrCreateUser = () => {
        user_model_1.userModel.findOne({ 'username': username }, (err, user) => {
            // console.log(`Username: ${username}, Password: ${password}, User: ${user}, REQUEST: ${req.body}`)
            if (err) {
                // console.log(`Error in SingUp: ${err}`);
                return done(err);
            }
            if (user) {
                // console.log('User already exists');
                return done(null, false, { message: 'User Already Exists' });
            }
            else {
                let newUser = new user_model_1.userModel();
                newUser.username = username;
                newUser.password = index_db_1.createHash(password);
                newUser.email = req.body.email;
                newUser.nombre = req.body.nombre;
                newUser.apellido = req.body.apellido;
                newUser.save((err) => {
                    if (err) {
                        // console.log(`Error in Saving user: ${err}`);
                        throw err;
                    }
                    // console.log('User registration succesful')
                    return done(null, newUser);
                });
            }
        });
    };
    process.nextTick(findOrCreateUser);
}));
passport_1.default.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'picture.type(large)'],
    scope: ["email"],
    enableProof: true,
}, (accessToken, refreshToken, profile, cb) => {
    const findOrCreate = () => {
        userFacebook_model_1.userFacebookModel.findOne({ 'facebookId': profile.id }, (err, user) => {
            if (err) {
                // console.log(`Error in SingUp: ${err}`);
                return cb(err);
            }
            if (user) {
                // console.log('User already exists, login succesfully');
                return cb(null, user);
            }
            else {
                let newUser = new userFacebook_model_1.userFacebookModel();
                newUser.facebookId = profile.id;
                newUser.username = profile._json.name;
                newUser.email = profile._json.email;
                newUser.photo = profile._json.picture.data.url;
                newUser.save((err) => {
                    if (err) {
                        // console.log(`Error in Saving user: ${err}`);
                        throw err;
                    }
                    // console.log('User registration succesfully')
                    return cb(null, newUser);
                });
            }
        });
    };
    process.nextTick(findOrCreate);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => {
    user_model_1.userModel.findById(id, (err, user) => {
        done(err, user);
    });
});
const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
};
exports.checkAuthentication = checkAuthentication;
exports.inicializarPassport = passport_1.default.initialize();
exports.sessionPassport = passport_1.default.session();
