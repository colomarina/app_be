"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsApp = exports.sendSMS = void 0;
const winston_config_1 = require("../config/winston.config");
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTHTOKEN);
const sendSMS = ({ mensaje, para }) => client.messages.create({
    body: `${mensaje}`,
    from: '+16122842307',
    to: para
})
    .then((message) => winston_config_1.logger.info(message))
    .catch((error) => winston_config_1.logger.error(error));
exports.sendSMS = sendSMS;
const sendWhatsApp = ({ mensaje, para }) => client.messages.create({
    body: mensaje,
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${para}`
})
    .then((message) => winston_config_1.logger.info(message))
    .catch((error) => winston_config_1.logger.error(error));
exports.sendWhatsApp = sendWhatsApp;
