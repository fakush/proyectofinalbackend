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
const productsAPI_1 = require("../apis/productsAPI");
class Producto {
    checkValidProduct(req, res, next) {
        const { nombre, precio, stock } = req.body;
        //Note: Chequeo que los campos nombre, precio y stock existan y sean validos. (El resto pueden venir o no.)
        if (!nombre || !precio || !stock) {
            return res.status(400).json({
                msg: 'Falta ingresar alguno de los campos obligatorios: Nombre, Precio y Stock'
            });
        }
        next();
    }
    // Reviso que cada campo sea del tipo que debería ser
    checkValidTypes(req, res, next) {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        if (!nombre && !descripcion && !codigo && !foto && !precio && !stock) {
            return res.status(400).json({
                msg: 'Al menos se debe ingresar un campo a modificar'
            });
        }
        if ((nombre && typeof nombre !== 'string') ||
            (descripcion && typeof descripcion !== 'string') ||
            (codigo && typeof codigo !== 'string') ||
            (foto && typeof foto !== 'string') ||
            (precio && isNaN(precio)) ||
            (stock && isNaN(stock))) {
            return res.status(400).json({
                msg: 'El tipo de dato para alguno de los campos es incorrecto'
            });
        }
        next();
    }
    checkValidId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    msg: 'missing parameters'
                });
            }
            const producto = yield productsAPI_1.productsAPI.getProducts(id);
            if (producto.length < 1) {
                return res.status(404).json({
                    msg: 'Invalid Id'
                });
            }
            next();
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { nombre, codigo, precio, precioMin, precioMax, stock, stockMin, stockMax } = req.query;
            if (id) {
                const producto = yield productsAPI_1.productsAPI.getProducts(id);
                if (!producto)
                    res.status(404).json({ msg: `product not found` });
                return res.json({ data: producto });
            }
            const query = {};
            if (nombre)
                query.nombre = nombre.toString();
            if (codigo)
                query.codigo = codigo.toString();
            if (precio)
                query.precio = Number(precio);
            if (precioMin)
                query.precioMin = precioMin.toString();
            if (precioMax)
                query.precioMax = precioMax.toString();
            if (stock)
                query.stock = Number(stock);
            if (stockMin)
                query.stockMin = stockMin.toString();
            if (stockMax)
                query.stockMax = stockMax.toString();
            if (Object.keys(query).length) {
                return res.json({ data: yield productsAPI_1.productsAPI.query(query) });
            }
            return res.json({ data: yield productsAPI_1.productsAPI.getProducts() });
        });
    }
    addProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield productsAPI_1.productsAPI.addProduct(req.body);
            return res.json({ msg: 'creando productos', data: newItem });
        });
    }
    updateProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const updatedItem = yield productsAPI_1.productsAPI.updateProduct(id, req.body);
            res.json({
                msg: 'actualizando productos',
                data: updatedItem
            });
        });
    }
    deleteProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield productsAPI_1.productsAPI.deleteProduct(id);
            return res.json({
                msg: 'borrando productos',
                data: yield productsAPI_1.productsAPI.getProducts()
            });
        });
    }
}
exports.controllerProductos = new Producto();
