"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerProductos = void 0;
const persistenceProductos_1 = require("../persistence/persistenceProductos");
class Producto {
    getProducts(req, res) {
        const id = Number(req.params.id);
        if (id) {
            const producto = persistenceProductos_1.persistenceProductos.get(id);
            if (!producto)
                res.status(404).json({
                    msg: `product not found`
                });
            return res.json({
                data: producto
            });
        }
        return res.json({
            data: persistenceProductos_1.persistenceProductos.get()
        });
    }
    checkValidProduct(req, res, next) {
        const { nombre, precio, stock } = req.body;
        // Chequeo que los campos nombre, precio y stock existan y sean validos. (El resto pueden venir o no.)
        if (!nombre || !precio || !stock || typeof nombre !== 'string' || isNaN(precio) || isNaN(stock)) {
            return res.status(400).json({
                msg: 'error de ingreso'
            });
        }
        next();
    }
    checkValidId(req, res, next) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                msg: 'missing parameters'
            });
        }
        const producto = persistenceProductos_1.persistenceProductos.find(id);
        if (!producto) {
            return res.status(404).json({
                msg: 'product not found'
            });
        }
        next();
    }
    addProducts(req, res) {
        const newItem = persistenceProductos_1.persistenceProductos.add(req.body);
        return res.json({
            msg: 'creando productos',
            data: newItem
        });
    }
    updateProducts(req, res) {
        const id = Number(req.params.id);
        persistenceProductos_1.persistenceProductos.update(id, req.body);
        res.json({
            msg: 'actualizando productos',
            data: persistenceProductos_1.persistenceProductos.get(id)
        });
    }
    deleteProducts(req, res) {
        const id = Number(req.params.id);
        persistenceProductos_1.persistenceProductos.delete(id);
        return res.json({
            msg: 'borrando productos',
            data: persistenceProductos_1.persistenceProductos.get()
        });
    }
}
exports.controllerProductos = new Producto();
