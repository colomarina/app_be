import { Request, Response } from 'express';

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
      const { username }:any = req.user;
      req.logout();
      res.render('pages/logout', {
        nombreUsuario: username
      })
    } catch (error) {
      req.logout();
      res.render('pages/logout', {
        nombreUsuario: undefined
      })
    }
  },

  failRoute: (req: Request, res: Response) => {
    res.status(404).render('pages/error404')
  },

  getLoginFacebook: (req: Request, res: Response) => {
    const { _id , username , photo, email}:any = req.user;
    res.render('pages/index', {
      nombreUsuario: username.toUpperCase() ,
      fotoUsuario: photo,
      emailUsuario: email,
    })
  }

}