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
const express_session_1 = __importDefault(require("express-session"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const http = __importStar(require("http"));
const index_1 = __importDefault(require("../routes/index"));
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
let logged = { islogged: false, isTimedOut: false, isDestroyed: false, nombre: '' };
const unSegundo = 1000;
const unMinuto = unSegundo * 60;
const unaHora = unMinuto * 60;
const unDia = unaHora * 24;
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'SuperSecreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: unMinuto }
}));
// Main Page
app.get('/', (req, res) => {
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
