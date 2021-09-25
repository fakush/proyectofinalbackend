"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosTestAPI = void 0;
const faker_1 = __importDefault(require("faker"));
const uuid_1 = require("uuid");
class ProductosTest {
    constructor() {
        this.data = [];
    }
    findIndex(id) {
        return this.data.findIndex((aResource) => aResource.id == id);
    }
    getProducts(id = undefined) {
        if (this.data.length == 0)
            return ['no hay productos'];
        if (id)
            return this.data.filter((aResource) => aResource.id == id);
        return this.data;
    }
    addProducts() {
        this.data.push({
            id: (0, uuid_1.v4)(),
            nombre: faker_1.default.commerce.product(),
            precio: faker_1.default.commerce.price(),
            foto: faker_1.default.image.technics()
        });
    }
    updateProducts(id, data) {
        const index = this.findIndex(id);
        const recursoViejo = this.data[index];
        const recursoNuevo = Object.assign({ id }, data);
        const recursoActualizado = Object.assign(Object.assign({}, recursoViejo), recursoNuevo);
        this.data.splice(index, 1, recursoActualizado);
    }
    deleteProducts(id) {
        const index = this.findIndex(id);
        this.data.splice(index, 1);
    }
}
exports.ProductosTestAPI = new ProductosTest();
