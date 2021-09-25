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
        this.carrito = [];
        const mockData = [
            {
                _id: '1',
                timestamp: 'Apr 4 05:06:07',
                producto: {
                    id: 0,
                    timestamp: 'Apr 4 05:06:07',
                    nombre: 'Porsche',
                    descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
                    codigo: 'P0001',
                    foto: 'https://picsum.photos/200',
                    precio: 480,
                    stock: 17
                }
            },
            {
                _id: '2',
                timestamp: 'Apr 6 05:06:08',
                producto: {
                    id: 4,
                    timestamp: 'Apr 5 05:06:08',
                    nombre: 'Colgate',
                    descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
                    codigo: 'P0001',
                    foto: 'https://picsum.photos/200',
                    precio: 613,
                    stock: 25
                }
            },
            {
                _id: '3',
                timestamp: 'Apr 6 05:06:08',
                producto: {
                    id: 4,
                    timestamp: 'Apr 5 05:06:08',
                    nombre: 'Colgate',
                    descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
                    codigo: 'P0001',
                    foto: 'https://picsum.photos/200',
                    precio: 613,
                    stock: 25
                }
            }
        ];
        this.fileName = file;
        this.carrito = mockData;
        this.guardar();
    }
    leer(archivo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.carrito = JSON.parse(yield fs_1.default.promises.readFile(archivo, 'utf-8'));
        });
    }
    guardar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.default.promises.writeFile(this.fileName, JSON.stringify(this.carrito, null, '\t'));
        });
    }
    findIndex(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.fileName);
            return this.carrito.findIndex((aProduct) => aProduct._id == id);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.fileName);
            return this.carrito.find((aProduct) => aProduct._id === id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return this.carrito.filter((aProduct) => aProduct._id === id);
            }
            return this.carrito;
        });
    }
    add(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.fileName);
            const newItem = {
                _id: (0, uuid_1.v4)(),
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                producto: idProducto
            };
            this.carrito.push(newItem);
            yield this.guardar();
            return newItem;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.fileName)
                .then(() => this.findIndex(id))
                .then((index) => {
                this.carrito.splice(Number(index), 1);
                this.guardar();
            });
        });
    }
}
exports.PersistenciaFS = PersistenciaFS;
