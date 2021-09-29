"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const http = __importStar(require("http"));
const config_1 = __importDefault(require("../config"));
const index_1 = __importDefault(require("../routes/index"));
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const app = (0, express_1.default)();
// paths
const publicFolderPath = path_1.default.resolve(__dirname, '../../public');
const layoutDirPath = path_1.default.resolve(__dirname, '../../views/layouts');
const defaultLayerPth = path_1.default.resolve(__dirname, '../../views/layouts/index.hbs');
const partialDirPath = path_1.default.resolve(__dirname, '../../views/partials');
//Error Handler
const errorHandler = (err, req, res, next) => {
    console.log(`HUBO UN ERROR ${err}`);
    res.status(500).json({
        err: err.message
    });
};
app.use(errorHandler);
// Express & Handlebars Setup
app.use(express_1.default.static(publicFolderPath));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.engine('hbs', (0, express_handlebars_1.default)({
    layoutsDir: layoutDirPath,
    extname: 'hbs',
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath
}));
//Login
const unSegundo = 1000;
const unMinuto = unSegundo * 60;
const unaHora = unMinuto * 60;
const unDia = unaHora * 24;
//Conecto a Mongoose (Esto debería al menos protestar)
const clientP = mongoose_1.default
    .connect(`mongodb+srv://${config_1.default.MONGO_ATLAS_USER}:${config_1.default.MONGO_ATLAS_PASSWORD}@${config_1.default.MONGO_ATLAS_CLUSTER}/${config_1.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`)
    .then((m) => m.connection.getClient());
const StoreOptions = {
    store: connect_mongo_1.default.create({
        clientPromise: clientP,
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
let logged = { islogged: false, isTimedOut: false, isDestroyed: false, nombre: '', contador: 0 };
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)(StoreOptions));
// Main Page
app.get('/', (req, res) => {
    console.log('estoy en get');
    if (logged.islogged)
        logged.contador = logged.contador + 1;
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
    }
    else {
        res.render('main', logged);
    }
});
app.post('/login', (req, res) => {
    if (req.body.nombre) {
        req.session.nombre = req.body.nombre;
        logged.nombre = req.body.nombre;
        logged.islogged = true;
    }
    res.redirect('/');
});
app.post('/logout', (req, res) => {
    req.session.destroy;
    logged.islogged = false;
    logged.isDestroyed = true;
    res.redirect('/');
});
// Use routers
app.use('/api', index_1.default);
const myServer = new http.Server(app);
exports.default = myServer;
