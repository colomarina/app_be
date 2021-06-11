"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = require("../service/mail");
const enviarMailEthereal = (asunto, username) => {
    const hoy = new Date();
    const fechaDeHoy = hoy.toDateString();
    const horaDelEvento = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    mail_1.transporterEthereal.sendMail({
        from: 'Servidor Node.js',
        to: 'natalia.fahey35@ethereal.email',
        subject: `Operacion ${asunto}`,
        html: `<h1>Usuario: ${username}</h1><br><h1>Fecha de hoy: ${fechaDeHoy}</h1><br><h1>Hora del evento: ${horaDelEvento}</h1>`
    }, (err, info) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log(info);
    });
};
const enviarMailGmail = (asunto, email, photo) => {
    mail_1.transporterGmail.sendMail({
        from: 'Servidor Node.js',
        to: email,
        subject: `Operacion ${asunto}`,
        html: `<h1>Foto de perfil: ${photo}</h1>`,
        // attachments: [
        //   {
        //     path: photo
        //   }
        // ]
    }, (err, info) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log(info);
    });
};
module.exports = {
    login: (req, res) => {
        res.json({
            message: 'You made it to the secure route',
            user: req.user,
            token: req.query.secret_token
        });
    }
};
