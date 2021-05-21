"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const logConf = {
    transports: [
        new winston_1.default.transports.File({
            level: 'error',
            filename: './ts/logs/error.log'
        }),
        new winston_1.default.transports.File({
            level: 'warn',
            filename: './ts/logs/warn.log'
        }),
        new winston_1.default.transports.Console({
            level: 'info'
        })
    ]
};
const logger = winston_1.default.createLogger(logConf);
exports.logger = logger;
