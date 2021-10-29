import express, { Request, Response, ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from '../middleware/userAuth';
import handlebars from 'express-handlebars';
import path from 'path';
import * as http from 'http';
import Config from '../config';
import routersIndex from '../routes/index';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
import { userStatus } from '../middleware/userStatus';
import compression from 'compression';
import { logger } from '../middleware/logger';
import { mongoConnection } from '../utils/MongoConnection';

const app = express();

// paths
logger.log.info(process.cwd() + '/public');
const publicFolderPath = process.cwd() + '/public';
const layoutDirPath = process.cwd() + '/views/layouts';
const defaultLayerPth = process.cwd() + '/views/layouts/index.hbs';
const partialDirPath = process.cwd() + '/views/partials';

//Error Handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.log.error(`HUBO UN ERROR ${err}`);
  res.status(500).json({
    err: err.message
  });
};
app.use(errorHandler);

// Setea el uso de compresion.
app.use(compression());

// Express & Handlebars Setup
app.use(express.static(publicFolderPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    extname: 'hbs',
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath
  })
);

//Login
const unSegundo = 1000;
const unMinuto = unSegundo * 60;
const unaHora = unMinuto * 60;
const unDia = unaHora * 24;
//Conecto a Mongoose (Esto debería al menos protestar, peno no...)
// const clientP = mongoose.connect(`mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`).then((m) => m.connection.getClient());
const StoreOptions = {
  store: MongoStore.create({
    clientPromise: mongoConnection,
    dbName: 'persistencia',
    stringify: false,
    autoRemove: 'interval',
    autoRemoveInterval: 1
  }),
  secret: 'SuperSecreto',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: unMinuto * 10 }
};

app.use(cookieParser());
app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(`REQ.SESSION =>\n${JSON.stringify(req.session)}`);
//   console.log(`REQ.USER =>\n${JSON.stringify(req.user)}`);
//   console.log(`REQ.AUTHENTICATE =>\n${JSON.stringify(req.isAuthenticated())}`);
//   next();
// });

// Main Page
app.get('/', (req: any, res) => {
  userStatus.islogged ? userStatus.contador++ : (userStatus.contador = 0);
  res.render('main', userStatus);
  userStatus.isDestroyed = false;
  userStatus.isTimedOut = false;
  userStatus.signUpError = false;
  userStatus.signUpOK = false;
  userStatus.loginError = false;
});

// Use routers
app.use('/api', routersIndex);

const myServer = new http.Server(app);
export default myServer;
