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
const mongo_db_1 = require("../services/mongo_db");
const moment_1 = __importDefault(require("moment"));
class PersistenciaProductos {
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield mongo_db_1.mongoDBService.find(id);
            if (item == 0)
                return false;
            return true;
        });
    }
    findGreatest() {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield mongo_db_1.mongoDBService.findGreatest();
            return item.id + 1;
        });
    }
    get(id = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const item = yield mongo_db_1.mongoDBService.get(id);
                return item;
            }
            const items = yield mongo_db_1.mongoDBService.get();
            return items;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItemData = {
                id: 0,
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                nombre: data.nombre,
                descripcion: data.descripcion || 'Falta descripción',
                codigo: data.codigo || 'PXXXX',
                foto: data.foto || 'https://picsum.photos/200',
                precio: Number(data.precio),
                stock: Number(data.stock)
            };
            const cretateItem = () => {
                const proceso = this.findGreatest()
                    .then((result) => (newItemData.id = result))
                    .then(() => mongo_db_1.mongoDBService.create(newItemData))
                    .then(() => mongo_db_1.mongoDBService.get(Number(newItemData.id)));
                return proceso;
            };
            return yield cretateItem();
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.mongoDBService.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.mongoDBService.delete(id);
        });
    }
}
exports.productosDBService = new PersistenciaProductos();
