import express from 'express';
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

// Main Page
app.get('/', (req, res) => {
  res.render('main');
});

// Use routers
app.use('/api', routersIndex);

const myServer = new http.Server(app);
export default myServer;
