"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerProductos = void 0;
// import { persistenceProductos } from '../persistence/persistenceProductos';
const persistenceDBProductos_1 = require("../persistence/persistenceDBProductos");
class Producto {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (id) {
                const producto = yield persistenceDBProductos_1.productosDBService.get(id);
                if (!producto)
                    res.status(404).json({
                        msg: `product not found`
                    });
                return res.json({
                    data: producto
                });
            }
            return res.json({
                data: yield persistenceDBProductos_1.productosDBService.get()
            });
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
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (!id) {
                return res.status(400).json({
                    msg: 'missing parameters'
                });
            }
            const producto = yield persistenceDBProductos_1.productosDBService.find(id);
            if (!producto) {
                return res.status(404).json({
                    msg: 'product not found'
                });
            }
            next();
        });
    }
    addProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield persistenceDBProductos_1.productosDBService.add(req.body);
            return res.json({
                msg: 'creando productos',
                data: newItem
            });
        });
    }
    updateProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield persistenceDBProductos_1.productosDBService.update(id, req.body);
            res.json({
                msg: 'actualizando productos',
                data: yield persistenceDBProductos_1.productosDBService.get(id)
            });
        });
    }
    deleteProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield persistenceDBProductos_1.productosDBService.delete(id);
            return res.json({
                msg: 'borrando productos',
                data: yield persistenceDBProductos_1.productosDBService.get()
            });
        });
    }
}
exports.controllerProductos = new Producto();
