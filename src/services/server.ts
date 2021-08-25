import express from 'express';
// import handlebars from 'express-handlebars';
import path from 'path';
import * as http from 'http';
import routersIndex from '../routes/index';

const app = express();
const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routersIndex);
// app.get('/', (req, res) => {
//   res.json({
//     msg: 'Main Page'
//   });
// });

const myServer = new http.Server(app);
export default myServer;
