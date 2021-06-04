require('dotenv').config()
import MongoStore from "connect-mongo";

export const sessionConfig = {
  store: MongoStore.create({
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
  rolling:false,
  cookie: {
    maxAge:60000
  }
}