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
exports.cartAPI = void 0;
const cart_factory_1 = require("../models/cart/cart.factory");
const tipo = cart_factory_1.Persistencia.Memory;
class cartAPIClass {
    constructor() {
        this.cart = cart_factory_1.CartFactory.get(tipo);
    }
    getItems(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                return yield this.cart.get(id);
            else
                return yield this.cart.get();
        });
    }
    addItems(itemData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.cart.add(itemData);
            return newProduct;
        });
    }
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cart.delete(id);
        });
    }
}
exports.cartAPI = new cartAPIClass();
