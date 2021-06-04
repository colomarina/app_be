import { Request, Response } from 'express';
import { transporterEthereal, transporterGmail } from '../service/mail';

const enviarMailEthereal = (asunto: string, username?: any) => {
  const hoy = new Date();
  const fechaDeHoy = hoy.toDateString();
  const horaDelEvento = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  transporterEthereal.sendMail({
    from: 'Servidor Node.js',
    to: 'natalia.fahey35@ethereal.email',
    subject: `Operacion ${asunto}`,
    html: `<h1>Usuario: ${username}</h1><br><h1>Fecha de hoy: ${fechaDeHoy}</h1><br><h1>Hora del evento: ${horaDelEvento}</h1>`
  }, (err, info) => {
    if (err) {
      console.log(err)
      return err
    }
    console.log(info)
  })
}

const enviarMailGmail = (asunto:string, email: string, photo: any) => {
  transporterGmail.sendMail({
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
      console.log(err)
      return err
    }
    console.log(info)
  })
}

module.exports = {

  getRoot: (req: Request, res: Response) => {
    res.send("Bienvenido")
  },

  goLogin: (req: Request, res: Response) => {
    res.redirect('/login')
  },

  getLogin: (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      let user = req.user;
      // console.log('Usuario logueado');
      res.json({ user })
    } else {
      // console.log('Usuario no logueado');
      res.render('pages/login')
    }
  },

  getSingup: (req: Request, res: Response) => {
    res.render('pages/register')
  },

  postLogin: (req: Request, res: Response) => {
    res.redirect('/api/productos')
  },

  postSingup: (req: Request, res: Response) => {
    res.redirect('/api/productos')
  },

  getFaillogin: (req: Request, res: Response) => {
    res.render('pages/loginError')
  },

  getFailsingup: (req: Request, res: Response) => {
    res.render('pages/registerError')
  },

  getLogout: (req: Request, res: Response) => {
    try {
      const { username }: any = req.user;
      req.logout();
      res.render('pages/logout', {
        nombreUsuario: username
      })
    } catch (error) {
      req.logout();
      enviarMailEthereal('logout')
      res.render('pages/logout', {
        nombreUsuario: undefined
      })
    }
  },

  failRoute: (req: Request, res: Response) => {
    res.status(404).render('pages/error404')
  },

  getLoginFacebook: (req: Request, res: Response) => {
    const { _id, username, photo, email }: any = req.user;
    enviarMailEthereal('login', username)
    enviarMailGmail('login', 'lucasmarina26@gmail.com', photo)
    res.render('pages/index', {
      nombreUsuario: username.toUpperCase(),
      fotoUsuario: photo,
      emailUsuario: email,
    })
  }

}