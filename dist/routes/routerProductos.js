"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerProductos_1 = require("../controllers/controllerProductos");
const admin_1 = require("../middleware/admin");
const router = (0, express_1.Router)();
router.get('/listar', controllerProductos_1.controllerProductos.getProducts);
router.get('/listar/:id', controllerProductos_1.controllerProductos.checkValidId, controllerProductos_1.controllerProductos.getProducts);
router.post('/agregar', admin_1.isAdmin, controllerProductos_1.controllerProductos.checkValidProduct, controllerProductos_1.controllerProductos.addProducts);
router.put('/actualizar/:id', admin_1.isAdmin, controllerProductos_1.controllerProductos.checkValidId, controllerProductos_1.controllerProductos.checkValidProduct, controllerProductos_1.controllerProductos.updateProducts);
router.delete('/borrar/:id', admin_1.isAdmin, controllerProductos_1.controllerProductos.checkValidId, controllerProductos_1.controllerProductos.deleteProducts);
exports.default = router;
