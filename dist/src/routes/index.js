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
const express_1 = require("express");
const routerCarrito_1 = __importDefault(require("./routerCarrito"));
const routerProductos_1 = __importDefault(require("./routerProductos"));
const routerProductosVistaTest_1 = __importDefault(require("./routerProductosVistaTest"));
const routerUsers_1 = __importDefault(require("./routerUsers"));
const userAuth_1 = __importStar(require("../middleware/userAuth"));
const userStatus_1 = require("../middleware/userStatus");
const router = (0, express_1.Router)();
router.use('/productos/vista-test', routerProductosVistaTest_1.default);
router.use('/carrito', routerCarrito_1.default);
router.use('/productos', routerProductos_1.default);
router.use('/user', userAuth_1.isLoggedIn, routerUsers_1.default);
router.get('/hello', (req, res) => {
    userStatus_1.userStatus.session = req.session;
    res.json({ msg: 'HOLA', userStatus: userStatus_1.userStatus });
});
router.get('/auth/facebook', userAuth_1.default.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', userAuth_1.default.authenticate('facebook', {
    successRedirect: '/api/datos',
    failureRedirect: '/api/fail'
}));
router.get('/datos', (req, res) => {
    if (req.isAuthenticated()) {
        const userData = req.user;
        userStatus_1.userStatus.nombre = userData.displayName;
        if (userData.photos)
            userStatus_1.userStatus.foto = userData.photos[0].value;
        if (userData.emails)
            userStatus_1.userStatus.email = userData.emails[0].value;
    }
    userStatus_1.userStatus.notLogged = false;
    userStatus_1.userStatus.islogged = true;
    res.redirect('/');
    console.log('hice el redirect');
});
router.get('/fail', (req, res) => {
    userStatus_1.userStatus.loginError = true;
    res.redirect('/');
    console.log('hice el redirect');
});
router.post('/logout', (req, res) => {
    userStatus_1.userStatus.notLogged = true;
    userStatus_1.userStatus.islogged = false;
    userStatus_1.userStatus.isDestroyed = true;
    req.session.destroy;
    res.redirect('/');
});
exports.default = router;
