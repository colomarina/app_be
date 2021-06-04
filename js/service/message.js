"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTHTOKEN);
const sendSMS = (mensaje) => client.messages.create({
    body: `${mensaje}`,
    from: '+16122842307',
    to: '+542216408251'
})
    .then((message) => console.log(message))
    .catch(console.log);
exports.sendSMS = sendSMS;
