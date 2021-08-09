const dotenv = require('dotenv');
const path = require('path');
const { persistencia, puerto } = require('minimist')(process.argv.slice(2));

dotenv.config({
  path: path.resolve(process.env.NODE_ENV + '.env')
})

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: puerto || process.env.PORT || 8080,
  PERSISTENCIA: persistencia || process.env.PERSISTENCIA,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_SECRET_KEY: process.env.MONGO_SECRET_KEY,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  MAIL_ETHEREAL: process.env.MAIL_ETHEREAL,
  MAIL_ETHEREAL_PASSWORD: process.env.MAIL_ETHEREAL_PASSWORD,
  MAIL_GMAIL: process.env.MAIL_GMAIL,
  MAIL_GMAIL_PASSWORD: process.env.MAIL_GMAIL_PASSWORD,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTHTOKEN: process.env.TWILIO_AUTHTOKEN,
  TWILIO_FROM: process.env.TWILIO_FROM,
  TWILIO_TO: process.env.TWILIO_TO,
  USER_EMAIL: process.env.USER_EMAIL,
  USER_PASSWORD: process.env.USER_PASSWORD
}