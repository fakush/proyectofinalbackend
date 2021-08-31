"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistenceProductos = void 0;
const moment_1 = __importDefault(require("moment"));
const controllerFiles_1 = __importDefault(require("../controllers/controllerFiles"));
const productsFile = new controllerFiles_1.default('productList.json');
let productos = JSON.parse(productsFile.read());
const getMaxid = () => {
    const max = productos.reduce((item, max) => (item.id > max ? item.id : max), 0);
    return Number(max.id) + 1;
};
class Persistence {
    find(id) {
        return productos.find((index) => index.id === Number(id));
    }
    get(id = null) {
        if (id) {
            return productos.filter((item) => item.id === id);
        }
        return productos;
    }
    add(data) {
        const newItem = {
            // Seteo algunos valores x default
            id: getMaxid(),
            timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
            nombre: data.nombre,
            descripcion: data.descripcion || 'Falta descripción',
            codigo: data.codigo || 'PXXXX',
            foto: data.foto || 'https://picsum.photos/200',
            precio: Number(data.precio),
            stock: Number(data.stock)
        };
        productos.push(newItem);
        productsFile.write(productos);
        return newItem;
    }
    update(id, data) {
        const index = productos.findIndex((item) => Number(item.id) === id);
        productos[index].timestamp = (0, moment_1.default)().format('MMM DD hh:mm:ss');
        productos[index].nombre = data.nombre;
        // Chequeo si los valores cambiaron antes de asignarlos
        if (data.descripcion)
            productos[index].descripcion = data.descripcion;
        if (data.codigo)
            productos[index].codigo = data.codigo;
        if (data.foto)
            productos[index].foto = data.foto;
        productos[index].precio = Number(data.precio);
        productos[index].stock = Number(data.stock);
        productsFile.write(productos);
    }
    delete(id) {
        productos = productos.filter((item) => item.id !== Number(id));
        productsFile.write(productos);
        return productos;
    }
}
exports.persistenceProductos = new Persistence();
