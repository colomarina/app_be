require('dotenv').config()
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTHTOKEN);

const sendSMS = (mensaje: string) => client.messages.create({
  body: `${mensaje}`,
  from: '+16122842307',
  to: '+542216408251'
})
.then((message: any) => console.log(message))
.catch(console.log)

export {
  sendSMS
}