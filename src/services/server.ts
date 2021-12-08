import express, { Request, Response, ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import helmet from 'helmet';
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
import { mongoConnection, MongoDB, atlasURL } from '../utils/MongoConnection';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { graphqlHTTP } from 'express-graphql';
import { resolvers, graphqlSchema } from './graphql';

const app = express();
const myMongo = new MongoDB();
myMongo.getConnection();

// paths
logger.log.info(process.cwd() + '/public');
const publicFolderPath = process.cwd() + '/public';
const uploadsFolderPath = process.cwd() + '/assets/images';
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

// Setea el uso de helmet.
// app.use(helmet());

// Setea el uso de graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: true
  })
);

// Express & Handlebars Setup
app.use(express.static(publicFolderPath));
app.use(express.static(uploadsFolderPath));
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
    mongoUrl: atlasURL,
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

// app.use((req, res, next) => {
//   console.log(`REQ.SESSION =>\n${JSON.stringify(req.session)}`.yellow);
//   console.log(`REQ.USER =>\n${JSON.stringify(req.user)}`.yellow);
//   next();
// });

app.use(passport.initialize());
app.use(passport.session());

// Main Page
app.get('/', (req: Request, res) => {
  userStatus.islogged ? userStatus.contador++ : (userStatus.contador = 0);
  res.render('main', userStatus);
  userStatus.isDestroyed = false;
  userStatus.isTimedOut = false;
  userStatus.signUpError = false;
  userStatus.signUpOK = false;
  userStatus.loginError = false;
});

//TODO: Render Imagenes
app.get('/images', (req: Request, res) => {
  res.render(process.cwd() + '/assets/images');
});

// Use routers
app.use('/api', routersIndex);

// Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proyecto Backend para CoderHouse',
      version: '0.0.1',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Facundo Creus',
        url: 'https://github.com/fakush',
        email: 'fcreus@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server'
      }
    ]
  },
  apis: ['src/routes/*']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const myServer = new http.Server(app);
export default myServer;
