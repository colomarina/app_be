import { logger } from "../config/winston.config";

require('dotenv').config()
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTHTOKEN);

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