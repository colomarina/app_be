import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/winston.config';
import { crearCarrito, updateUser } from '../db/index.db';
const passport = require('passport');
const jwt = require('jsonwebtoken');
import { transporterEthereal, transporterGmail } from '../service/mail';

const enviarMailEthereal = (asunto: string, user: any) => {
  const hoy = new Date();
  const fechaDeHoy = hoy.toDateString();
  const horaDelEvento = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  transporterEthereal.sendMail({
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
      logger.error(err)
      return err
    }
    console.log(info)
  })
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const UpdateUser = req.body;
  const user = req.user;
  updateUser( user , UpdateUser)
    .then(() => {
      enviarMailEthereal('Nuevo Registro', UpdateUser)
      crearCarrito(user)
        .then(() => {
          res.json({
            message: 'Signup successful',
            user: req.user
          });
        })
        .catch((error) => {
          logger.error(error)
          res.json({
            error: error
          })
        })
    })
    .catch((error) => {
      logger.error(error)
      res.json({
        error: error
      })
    })
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (err: any, user: any, info: any) => {
      try {
        if (err) {
          const error = new Error('An error occurred.');
          return next(error);
        }
        if (!user && info) {
          return res.status(401).json({ message: info.message });
        }
        req.login(
          user,
          { session: false },
          async (error: any) => {
            if (error) return next(error);
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, 'TOP_SECRET');
            return res.json({ token });
          }
        );
      } catch (error) {
        logger.error(error)
        return next(error);
      }
    }
  )(req, res, next);
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  req.logout()
  res.json({
    message: 'Te deslogueaste'
  })
}

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
}

const loginFacebook = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
}

module.exports = { 
  login, 
  signup, 
  logout, 
  getProfile,
  loginFacebook,
};