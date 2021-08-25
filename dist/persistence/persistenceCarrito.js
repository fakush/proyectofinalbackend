"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistenceCarrito = void 0;
const moment_1 = __importDefault(require("moment"));
const controllerFiles_1 = __importDefault(require("../controllers/controllerFiles"));
const productFile = new controllerFiles_1.default('productList.json');
const cartFile = new controllerFiles_1.default('savedcart.json');
let carrito = JSON.parse(cartFile.read());
const getMaxid = () => {
    const max = carrito.reduce((item, max) => (item.id > max ? item.id : max), 0);
    return Number(max.id) + 1;
};
class Persistence {
    find(id) {
        return carrito.find((index) => index.id === Number(id));
    }
    findProduct(id) {
        const poductList = JSON.parse(productFile.read());
        return poductList.find((index) => index.id === Number(id));
    }
    get(id = null) {
        if (id) {
            return carrito.filter((item) => item.id === id);
        }
        return carrito;
    }
    add(id) {
        const poductList = JSON.parse(productFile.read());
        const producto = poductList.filter((item) => item.id === id);
        const newItem = {
            id: getMaxid(),
            timestamp: moment_1.default().format('MMM DD hh:mm:ss'),
            producto: producto
        };
        carrito.push(newItem);
        cartFile.write(carrito);
        return newItem;
    }
    delete(id) {
        carrito = carrito.filter((item) => item.id !== Number(id));
        cartFile.write(carrito);
        return carrito;
    }
}
exports.persistenceCarrito = new Persistence();
