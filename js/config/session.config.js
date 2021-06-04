"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
require('dotenv').config();
const connect_mongo_1 = __importDefault(require("connect-mongo"));
exports.sessionConfig = {
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 600
    }),
    secret: process.env.MONGO_SECRET_KEY || '',
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
        maxAge: 60000
    }
};
