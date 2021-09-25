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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenciaFS = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
class PersistenciaFS {
    constructor(file) {
        this.productos = [];
        const mockData = [
            {
                _id: '1',
                timestamp: 'Apr 5 05:06:08',
                nombre: 'BMW',
                descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
                codigo: 'P0002',
                foto: 'https://picsum.photos/200',
                precio: 2751,
                stock: 8
            },
            {
                _id: '2',
                timestamp: 'Apr 5 05:06:08',
                nombre: 'Kleenex',
                descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
                codigo: 'P0005',
                foto: 'https://picsum.photos/200',
                precio: 1898,
                stock: 12
            },
            {
                _id: '3',
                timestamp: 'Apr 4 05:06:07',
                nombre: 'Johnson & Johnson',
                descripcion: 'Esta primavera en mi cabaña, Absolutamente nada, Absolutamente todo',
                codigo: 'P0002',
                foto: 'https://picsum.photos/200',
                precio: 570,
                stock: 7
            },
            {
                _id: '4',
                timestamp: 'Apr 5 05:06:08',
                nombre: 'Colgate',
                descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
                codigo: 'P0001',
                foto: 'https://picsum.photos/200',
                precio: 3613,
                stock: 25
            },
            {
                _id: '5',
                timestamp: 'Apr 5 05:06:08',
                nombre: 'Pampers',
                descripcion: 'Anoche cubrí, mis hijos dormidos, y el ruido del mar.',
                codigo: 'P0003',
                foto: 'https://picsum.photos/200',
                precio: 856,
                stock: 21
            },
            {
                _id: '6',
                timestamp: 'Apr 4 05:06:09',
                nombre: 'Nike',
                descripcion: 'Mil pequeños peces blancos, Como si hirviera, El color del agua',
                codigo: 'P0005',
                foto: 'https://picsum.photos/200',
                precio: 4796,
                stock: 12
            },
            {
                _id: '7',
                timestamp: 'Apr 4 05:06:09',
                nombre: 'Disney',
                descripcion: 'Pareciera que el sapo, Va a expeler, una nube',
                codigo: 'P0004',
                foto: 'https://picsum.photos/200',
                precio: 1201,
                stock: 16
            },
            {
                _id: '8',
                timestamp: 'Apr 5 05:06:08',
                nombre: 'Pampers',
                descripcion: 'Mi cuenco de mendigar, Acepta hojas caídas',
                codigo: 'P0005',
                foto: 'https://picsum.photos/200',
                precio: 514,
                stock: 1
            },
            {
                id: '9',
                timestamp: 'Apr 5 05:06:08',
                nombre: 'Audi',
                descripcion: 'Bajo la lluvia de verano, El sendero, Desapareció',
                codigo: 'P0002',
                foto: 'https://picsum.photos/200',
                precio: 2457,
                stock: 15
            }
        ];
        this.fileName = file;
        this.productos = mockData;
        this.guardar();
    }
    leer(archivo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.productos = JSON.parse(yield fs_1.default.promises.readFile(archivo, 'utf-8'));
        });
    }
    guardar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.default.promises.writeFile(this.fileName, JSON.stringify(this.productos, null, '\t'));
        });
    }
    findIndex(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.fileName);
            return this.productos.findIndex((aProduct) => aProduct._id == id);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.fileName);
            return this.productos.find((aProduct) => aProduct._id === id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return this.productos.filter((aProduct) => aProduct._id === id);
            }
            return this.productos;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.fileName);
            const newItem = {
                _id: (0, uuid_1.v4)(),
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                nombre: data.nombre,
                descripcion: data.descripcion || 'Sin descripción',
                codigo: data.codigo || 'P0000',
                foto: data.foto || 'https://picsum.photos/200',
                precio: data.precio,
                stock: data.stock || 0
            };
            this.productos.push(newItem);
            yield this.guardar();
            return newItem;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            let objeto = yield this.leer(this.fileName)
                .then(() => this.findIndex(id))
                .then((index) => {
                let oldProduct = this.productos[Number(index)];
                oldProduct.timestamp = (0, moment_1.default)().format('MM DD hh:mm:ss');
                const updatedProduct = Object.assign(Object.assign({}, oldProduct), newProductData);
                this.productos.splice(Number(index), 1, updatedProduct);
                this.guardar();
                return updatedProduct;
            });
            return objeto;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.fileName)
                .then(() => this.findIndex(id))
                .then((index) => {
                this.productos.splice(Number(index), 1);
                this.guardar();
            });
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [];
            if (options.nombre)
                query.push((aProduct) => aProduct.nombre == options.nombre);
            if (options.codigo)
                query.push((aProduct) => aProduct.codigo == options.codigo);
            if (options.precio)
                query.push((aProduct) => aProduct.precio == options.precio);
            if (options.stock)
                query.push((aProduct) => aProduct.stock == options.stock);
            if (options.precioMin)
                query.push((aProduct) => aProduct.precio >= Number(options.precioMin));
            if (options.precioMax)
                query.push((aProduct) => aProduct.precio <= Number(options.precioMax));
            if (options.stockMin)
                query.push((aProduct) => aProduct.precio >= Number(options.stockMin));
            if (options.stockMax)
                query.push((aProduct) => aProduct.precio <= Number(options.stockMax));
            return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
        });
    }
}
exports.PersistenciaFS = PersistenciaFS;
