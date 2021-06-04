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
    getRoot: (req, res) => {
        res.send("Bienvenido");
    },
    goLogin: (req, res) => {
        res.redirect('/login');
    },
    getLogin: (req, res) => {
        if (req.isAuthenticated()) {
            let user = req.user;
            // console.log('Usuario logueado');
            res.json({ user });
        }
        else {
            // console.log('Usuario no logueado');
            res.render('pages/login');
        }
    },
    getSingup: (req, res) => {
        res.render('pages/register');
    },
    postLogin: (req, res) => {
        res.redirect('/api/productos');
    },
    postSingup: (req, res) => {
        res.redirect('/api/productos');
    },
    getFaillogin: (req, res) => {
        res.render('pages/loginError');
    },
    getFailsingup: (req, res) => {
        res.render('pages/registerError');
    },
    getLogout: (req, res) => {
        try {
            const { username } = req.user;
            req.logout();
            res.render('pages/logout', {
                nombreUsuario: username
            });
        }
        catch (error) {
            req.logout();
            enviarMailEthereal('logout');
            res.render('pages/logout', {
                nombreUsuario: undefined
            });
        }
    },
    failRoute: (req, res) => {
        res.status(404).render('pages/error404');
    },
    getLoginFacebook: (req, res) => {
        const { _id, username, photo, email } = req.user;
        enviarMailEthereal('login', username);
        enviarMailGmail('login', 'lucasmarina26@gmail.com', photo);
        res.render('pages/index', {
            nombreUsuario: username.toUpperCase(),
            fotoUsuario: photo,
            emailUsuario: email,
        });
    }
};
