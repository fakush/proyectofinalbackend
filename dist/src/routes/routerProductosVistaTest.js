"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerProductosVistaTest_1 = require("../controllers/controllerProductosVistaTest");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const routerVistaTest = (0, express_1.Router)();
routerVistaTest.get('/:id?', (0, express_async_handler_1.default)(controllerProductosVistaTest_1.controllerProductosTest.getProducts));
routerVistaTest.post('/:cant?', (0, express_async_handler_1.default)(controllerProductosVistaTest_1.controllerProductosTest.makeProducts));
routerVistaTest.put('/:id?', (0, express_async_handler_1.default)(controllerProductosVistaTest_1.controllerProductosTest.updateProducts));
routerVistaTest.delete('/:id?', (0, express_async_handler_1.default)(controllerProductosVistaTest_1.controllerProductosTest.deleteProducts));
exports.default = routerVistaTest;
