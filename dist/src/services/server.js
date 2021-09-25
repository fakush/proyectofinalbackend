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
//TODO Esto se tiene que ir
// Data Aux
const myArray = [];
const listData = { isList: false, isForm: true, addItem: true, productItem: myArray };
// Main Page
app.get('/', (req, res) => {
    res.render('main', listData);
});
// Use routers
app.use('/api', index_1.default);
const myServer = new http.Server(app);
exports.default = myServer;
