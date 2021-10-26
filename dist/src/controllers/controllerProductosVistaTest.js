"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerProductosTest = void 0;
const productsTestAPI_1 = require("../apis/productsTestAPI");
const logger_1 = require("../middleware/logger");
class ProductoTest {
    getProducts(req, res) {
        const id = req.params.id;
        if (id) {
            const producto = productsTestAPI_1.ProductosTestAPI.getProducts(id);
            if (!producto)
                res.status(404).json({ msg: `Random product not found` });
            return res.json({ data: producto });
        }
        return res.json({ data: productsTestAPI_1.ProductosTestAPI.getProducts() });
    }
    makeProducts(req, res) {
        const cant = req.query.cant != undefined && req.query.cant != '' ? Number(req.query.cant) : 10;
        logger_1.logger.log.debug(cant);
        for (let i = 0; i < cant; i++) {
            productsTestAPI_1.ProductosTestAPI.addProducts();
        }
        res.json({
            result: `Creando ${cant} productos`
        });
    }
    updateProducts(req, res) {
        const id = req.params.id;
        const recurso = productsTestAPI_1.ProductosTestAPI.getProducts(id);
        if (!recurso.length)
            return res.status(404).json({ msg: 'id not found' });
        const updatedItem = productsTestAPI_1.ProductosTestAPI.updateProducts(id, req.body);
        res.json({
            msg: 'actualizando productos',
            data: updatedItem
        });
    }
    deleteProducts(req, res) {
        const id = req.params.id;
        productsTestAPI_1.ProductosTestAPI.deleteProducts(id);
        return res.json({
            msg: 'borrando productos',
            data: productsTestAPI_1.ProductosTestAPI.getProducts()
        });
    }
}
exports.controllerProductosTest = new ProductoTest();
