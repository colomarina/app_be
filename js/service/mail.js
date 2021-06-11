"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarMailEthereal = exports.transporterGmail = exports.transporterEthereal = void 0;
require('dotenv').config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporterEthereal = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.MAIL_ETHEREAL,
        pass: process.env.MAIL_ETHEREAL_PASSWORD
    }
});
exports.transporterEthereal = transporterEthereal;
const transporterGmail = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_GMAIL,
        pass: process.env.MAIL_GMAIL_PASSWORD
    }
});
exports.transporterGmail = transporterGmail;
const enviarMailEthereal = ({ a, asunto, html }) => {
    transporterEthereal.sendMail({
        from: 'Servidor Node.js',
        to: a,
        subject: `Operacion ${asunto}`,
        html: html
    }, (err, info) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log(info);
    });
};
exports.enviarMailEthereal = enviarMailEthereal;
