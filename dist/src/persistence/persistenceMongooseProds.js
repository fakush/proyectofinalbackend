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
exports.productosDBService = void 0;
const db_1 = require("../services/db");
const moment_1 = __importDefault(require("moment"));
const tableName = 'productos';
class PersistenciaProductos {
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield db_1.mySQLdbService.find(tableName, id);
            if (item.length == 0)
                return false;
            return true;
        });
    }
    get(id = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const item = yield db_1.mySQLdbService.get(tableName, id);
                return item;
            }
            const items = yield db_1.mySQLdbService.get(tableName);
            return items;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItemData = {
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                nombre: data.nombre,
                descripcion: data.descripcion || 'Falta descripción',
                codigo: data.codigo || 'PXXXX',
                foto: data.foto || 'https://picsum.photos/200',
                precio: Number(data.precio),
                stock: Number(data.stock)
            };
            const newItem = yield db_1.mySQLdbService.create(tableName, newItemData);
            return db_1.mySQLdbService.get(tableName, Number(newItem));
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.mySQLdbService.update(tableName, id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.mySQLdbService.delete(tableName, id);
        });
    }
}
exports.productosDBService = new PersistenciaProductos();
