import MongoStore from "connect-mongo";
const config = require('../config/config')

export const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_URL,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl: 600
  }),
  secret: config.MONGO_SECRET_KEY || '',
  resave: false,
  saveUninitialized: false,
  rolling:false,
  cookie: {
    maxAge:60000
  }
}