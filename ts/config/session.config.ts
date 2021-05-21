import MongoStore from "connect-mongo";

export const sessionConfig = {
  store: MongoStore.create({
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
  rolling:false,
  cookie: {
    maxAge:60000
  }
}