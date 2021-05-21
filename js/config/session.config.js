"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
exports.sessionConfig = {
    store: connect_mongo_1.default.create({
        mongoUrl: 'mongodb+srv://colito:LM753951@cluster0.yjnag.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 600
    }),
    secret: 'kira753951',
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
        maxAge: 60000
    }
};
