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
const userAuth_1 = __importDefault(require("../middleware/userAuth"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const http = __importStar(require("http"));
const index_1 = __importDefault(require("../routes/index"));
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const userStatus_1 = require("../middleware/userStatus");
const app = (0, express_1.default)();
// paths
console.log(process.cwd() + '/public');
const publicFolderPath = process.cwd() + '/public';
const layoutDirPath = process.cwd() + '/views/layouts';
const defaultLayerPth = process.cwd() + '/views/layouts/index.hbs';
const partialDirPath = process.cwd() + '/views/partials';
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
//Conecto a Mongoose (Esto debería al menos protestar, peno no...)
// const clientP = mongoose.connect(`mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`).then((m) => m.connection.getClient());
const StoreOptions = {
    // store: MongoStore.create({
    //   clientPromise: clientP,
    //   dbName: 'persistencia',
    //   stringify: false,
    //   autoRemove: 'interval',
    //   autoRemoveInterval: 1
    // }),
    secret: 'SuperSecreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: unMinuto * 10 }
};
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)(StoreOptions));
app.use(userAuth_1.default.initialize());
app.use(userAuth_1.default.session());
// app.use((req, res, next) => {
//   console.log(`REQ.SESSION =>\n${JSON.stringify(req.session)}`);
//   console.log(`REQ.USER =>\n${JSON.stringify(req.user)}`);
//   console.log(`REQ.AUTHENTICATE =>\n${JSON.stringify(req.isAuthenticated())}`);
//   next();
// });
// Main Page
app.get('/', (req, res) => {
    userStatus_1.userStatus.islogged ? userStatus_1.userStatus.contador++ : (userStatus_1.userStatus.contador = 0);
    res.render('main', userStatus_1.userStatus);
    userStatus_1.userStatus.isDestroyed = false;
    userStatus_1.userStatus.isTimedOut = false;
    userStatus_1.userStatus.signUpError = false;
    userStatus_1.userStatus.signUpOK = false;
    userStatus_1.userStatus.loginError = false;
});
// Use routers
app.use('/api', index_1.default);
const myServer = new http.Server(app);
exports.default = myServer;
