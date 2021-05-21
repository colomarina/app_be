"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        res.render('pages/index', {
            nombreUsuario: username.toUpperCase(),
            fotoUsuario: photo,
            emailUsuario: email,
        });
    }
};
