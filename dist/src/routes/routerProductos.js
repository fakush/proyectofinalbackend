"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerProductos_1 = require("../controllers/controllerProductos");
const admin_1 = require("../middleware/admin");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
router.get('/', (0, express_async_handler_1.default)(controllerProductos_1.controllerProductos.getProducts));
router.get('/:id', controllerProductos_1.controllerProductos.checkValidId, (0, express_async_handler_1.default)(controllerProductos_1.controllerProductos.getProducts));
router.post('/', admin_1.isAdmin, controllerProductos_1.controllerProductos.checkValidProduct, controllerProductos_1.controllerProductos.checkValidTypes, (0, express_async_handler_1.default)(controllerProductos_1.controllerProductos.addProducts));
router.put('/:id?', admin_1.isAdmin, controllerProductos_1.controllerProductos.checkValidId, controllerProductos_1.controllerProductos.checkValidTypes, (0, express_async_handler_1.default)(controllerProductos_1.controllerProductos.updateProducts));
router.delete('/:id?', admin_1.isAdmin, controllerProductos_1.controllerProductos.checkValidId, (0, express_async_handler_1.default)(controllerProductos_1.controllerProductos.deleteProducts));
exports.default = router;
