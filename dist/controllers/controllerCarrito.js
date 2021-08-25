"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerCarrito = void 0;
const persistenceCarrito_1 = require("../persistence/persistenceCarrito");
class Carrito {
    getItems(req, res) {
        const id = Number(req.params.id);
        if (id) {
            const item = persistenceCarrito_1.persistenceCarrito.get(id);
            if (!item)
                res.status(404).json({
                    msg: `item not found`
                });
            return res.json({
                data: item
            });
        }
        return res.json({
            data: persistenceCarrito_1.persistenceCarrito.get()
        });
    }
    checkValidId(req, res, next) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(400).json({
                msg: 'missing parameters'
            });
        }
        const producto = persistenceCarrito_1.persistenceCarrito.find(id);
        if (!producto) {
            return res.status(404).json({
                msg: 'item not found'
            });
        }
        next();
    }
    checkValidProduct(req, res, next) {
        const id = Number(req.params.id_producto);
        if (!id) {
            return res.status(400).json({
                msg: 'missing parameters'
            });
        }
        const item = persistenceCarrito_1.persistenceCarrito.findProduct(id);
        if (!item) {
            return res.status(404).json({
                msg: 'product not found'
            });
        }
        next();
    }
    addItem(req, res) {
        const id = Number(req.params.id_producto);
        const newItem = persistenceCarrito_1.persistenceCarrito.add(id);
        return res.json({
            msg: 'añadiendo productos',
            data: newItem
        });
    }
    deleteItems(req, res) {
        const id = Number(req.params.id);
        persistenceCarrito_1.persistenceCarrito.delete(id);
        return res.json({
            msg: 'borrando productos',
            data: persistenceCarrito_1.persistenceCarrito.get()
        });
    }
}
exports.controllerCarrito = new Carrito();
