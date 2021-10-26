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
exports.PersistenciaMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const moment_1 = __importDefault(require("moment"));
const logger_1 = require("../../../middleware/logger");
//MongoSchema
const cartSchema = new mongoose_1.default.Schema({
    timestamp: { type: String, required: true },
    producto: { type: Object, required: true }
});
const dbCollection = 'carrito';
const mockData = [
    {
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
class PersistenciaMongo {
    constructor(local = false) {
        local
            ? (this.server = `mongodb://localhost:27017/${config_1.default.MONGO_LOCAL_DBNAME}`)
            : (this.server = `mongodb+srv://${config_1.default.MONGO_ATLAS_USER}:${config_1.default.MONGO_ATLAS_PASSWORD}@${config_1.default.MONGO_ATLAS_CLUSTER}/${config_1.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
        mongoose_1.default.connect(this.server);
        this.carrito = mongoose_1.default.model(dbCollection, cartSchema);
        this.carrito.count().then((count) => {
            if (count < 1) {
                logger_1.logger.log.warn('Insertando Data Mockup');
                this.carrito.insertMany(mockData);
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.carrito.findById(id);
            if (item == 0)
                return false;
            return true;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            try {
                if (id) {
                    const item = yield this.carrito.findById(id);
                    if (item)
                        output.push(item);
                }
                else
                    output = yield this.carrito.find();
                return output;
            }
            catch (err) {
                return output;
            }
        });
    }
    add(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCartItem = {
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                producto: idProducto
            };
            const newItem = new this.carrito(newCartItem);
            yield newItem.save();
            return newItem;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.carrito.findByIdAndDelete(id);
        });
    }
}
exports.PersistenciaMongo = PersistenciaMongo;
