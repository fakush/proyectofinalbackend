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
exports.controllerCarrito = void 0;
const cartAPI_1 = require("../apis/cartAPI");
const productsAPI_1 = require("../apis/productsAPI");
class Carrito {
    checkValidId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            // Esto verifica que haya un parametro
            if (!id) {
                return res.status(400).json({
                    msg: 'missing parameters'
                });
            }
            // Esto verifica que el parametro sea valido
            const item = yield cartAPI_1.cartAPI.getItems(id);
            if (item.length < 1) {
                return res.status(404).json({
                    msg: 'item not found'
                });
            }
            // Si pasa los dos chequeos sigue.
            next();
        });
    }
    checkValidProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id_producto;
            if (!id) {
                return res.status(400).json({
                    msg: 'missing parameters'
                });
            }
            const item = yield productsAPI_1.productsAPI.getProducts(id);
            if (item.length < 1) {
                return res.status(404).json({
                    msg: 'product not found'
                });
            }
            next();
        });
    }
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const item = yield cartAPI_1.cartAPI.getItems(id);
                if (!item)
                    res.status(404).json({
                        msg: `item not found`
                    });
                return res.json({
                    data: item
                });
            }
            return res.json({
                data: yield cartAPI_1.cartAPI.getItems()
            });
        });
    }
    addItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id_producto;
            const item = yield productsAPI_1.productsAPI.getProducts(id);
            const newItem = yield cartAPI_1.cartAPI.addItems(item);
            return res.json({
                msg: 'añadiendo productos',
                data: newItem
            });
        });
    }
    deleteItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield cartAPI_1.cartAPI.deleteItem(id);
            return res.json({
                msg: 'borrando productos',
                data: yield cartAPI_1.cartAPI.getItems()
            });
        });
    }
}
exports.controllerCarrito = new Carrito();
