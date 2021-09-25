import express, { Request, Response, ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import handlebars from 'express-handlebars';
import path from 'path';
import * as http from 'http';
import routersIndex from '../routes/index';

const app = express();

// paths
const publicFolderPath = path.resolve(__dirname, '../../public');
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialDirPath = path.resolve(__dirname, '../../views/partials');

//Error Handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`HUBO UN ERROR ${err}`);
  res.status(500).json({
    err: err.message
  });
};
app.use(errorHandler);

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
let logged = { islogged: false, isTimedOut: false, isDestroyed: false, nombre: '' };
const unSegundo = 1000;
const unMinuto = unSegundo * 60;
const unaHora = unMinuto * 60;
const unDia = unaHora * 24;
app.use(cookieParser());
app.use(
  session({
    secret: 'SuperSecreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: unMinuto }
  })
);

// Main Page
app.get('/', (req: any, res) => {
  console.log('estoy en get');
  if (!req.session.nombre && logged.islogged) {
    logged.islogged = false;
    logged.isTimedOut = true;
    res.render('main', logged);
    logged.isTimedOut = false;
    logged.nombre = '';
  }
  if (logged.isDestroyed) {
    res.render('main', logged);
    logged.nombre = ``;
    logged.isDestroyed = false;
  } else {
    res.render('main', logged);
  }
});

app.post('/login', (req: any, res) => {
  if (req.body.nombre) {
    req.session.nombre = req.body.nombre;
    logged.nombre = req.body.nombre;
    logged.islogged = true;
  }
  res.redirect('/');
});

app.post('/logout', (req: any, res) => {
  req.session.destroy;
  logged.islogged = false;
  logged.isDestroyed = true;
  res.redirect('/');
});

// Use routers
app.use('/api', routersIndex);

const myServer = new http.Server(app);
export default myServer;
