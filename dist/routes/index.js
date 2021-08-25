"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routerCarrito_1 = __importDefault(require("./routerCarrito"));
const routerProductos_1 = __importDefault(require("./routerProductos"));
const router = express_1.Router();
router.use('/carrito', routerCarrito_1.default);
router.use('/productos', routerProductos_1.default);
exports.default = router;
