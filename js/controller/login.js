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
Object.defineProperty(exports, "__esModule", { value: true });
const winston_config_1 = require("../config/winston.config");
const index_db_1 = require("../db/index.db");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mail_1 = require("../service/mail");
const enviarMailEthereal = (asunto, user) => {
    const hoy = new Date();
    const fechaDeHoy = hoy.toDateString();
    const horaDelEvento = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    mail_1.transporterEthereal.sendMail({
        from: 'Servidor Node.js',
        to: 'natalia.fahey35@ethereal.email',
        subject: `Operacion ${asunto}`,
        html: `
    <h1>Nombre Completo: ${user.nombreCompleto}<br>
    Usuario: ${user.email}<br>
    Direccion: ${user.direccion}<br>
    Edad: ${user.edad}<br>
    Celular: ${user.celular}<br>
    Foto: ${user.foto}</h1><br>
    <h1>Fecha de hoy: ${fechaDeHoy}</h1><br>
    <h1>Hora del evento: ${horaDelEvento}</h1>
    `
    }, (err, info) => {
        if (err) {
            winston_config_1.logger.error(err);
            return err;
        }
        console.log(info);
    });
};
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdateUser = req.body;
    const user = req.user;
    index_db_1.updateUser(user, UpdateUser)
        .then(() => {
        enviarMailEthereal('Nuevo Registro', UpdateUser);
        index_db_1.crearCarrito(user)
            .then(() => {
            res.json({
                message: 'Signup successful',
                user: req.user
            });
        })
            .catch((error) => {
            winston_config_1.logger.error(error);
            res.json({
                error: error
            });
        });
    })
        .catch((error) => {
        winston_config_1.logger.error(error);
        res.json({
            error: error
        });
    });
});
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err) {
                const error = new Error('An error occurred.');
                return next(error);
            }
            if (!user && info) {
                return res.status(401).json({ message: info.message });
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
                return res.json({ token });
            }));
        }
        catch (error) {
            winston_config_1.logger.error(error);
            return next(error);
        }
    }))(req, res, next);
});
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout();
    res.json({
        message: 'Te deslogueaste'
    });
});
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
    });
});
const loginFacebook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
    });
});
module.exports = {
    login,
    signup,
    logout,
    getProfile,
    loginFacebook,
};
