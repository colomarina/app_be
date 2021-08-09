import nodemailer from 'nodemailer';
const config = require('../config/config')

const transporterEthereal = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: config.MAIL_ETHEREAL,
    pass: config.MAIL_ETHEREAL_PASSWORD
  }
});


const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL_GMAIL,
    pass: config.MAIL_GMAIL_PASSWORD
  }
});

const enviarMailEthereal = ({ a, asunto, html}: any) => {
  transporterEthereal.sendMail({
    from: 'Servidor Node.js',
    to: a,
    subject: `Operacion ${asunto}`,
    html: html
  }, (err, info) => {
    if (err) {
      console.log(err)
      return err
    }
    console.log(info)
  })
}

export {
  transporterEthereal,
  transporterGmail,
  enviarMailEthereal
}