import { logger } from "../config/winston.config";
const config = require('../config/config')

const client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTHTOKEN);

const sendSMS = ({mensaje, para}: any) => client.messages.create({
  body: `${mensaje}`,
  from: '+16122842307',
  to: para
})
.then((message: any) => logger.info(message))
.catch((error: any) => logger.error(error))

const sendWhatsApp = ({mensaje, para}: any) => client.messages.create({ 
  body: mensaje, 
  from: 'whatsapp:+14155238886',       
  to: `whatsapp:${para}` 
})
.then((message: any) => logger.info(message))
.catch((error: any) => logger.error(error))


export {
  sendSMS,
  sendWhatsApp
}