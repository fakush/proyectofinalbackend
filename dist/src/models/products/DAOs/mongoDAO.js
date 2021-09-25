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
//MongoSchema
const productsSchema = new mongoose_1.default.Schema({
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, default: 'Sin descripción' },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 }
});
const dbCollection = 'productos';
const mockData = [
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'BMW',
        descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 2751,
        stock: 8
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Kleenex',
        descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 1898,
        stock: 12
    },
    {
        timestamp: 'Apr 4 05:06:07',
        nombre: 'Johnson & Johnson',
        descripcion: 'Esta primavera en mi cabaña, Absolutamente nada, Absolutamente todo',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 570,
        stock: 7
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Colgate',
        descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
        codigo: 'P0001',
        foto: 'https://picsum.photos/200',
        precio: 3613,
        stock: 25
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Pampers',
        descripcion: 'Anoche cubrí, mis hijos dormidos, y el ruido del mar.',
        codigo: 'P0003',
        foto: 'https://picsum.photos/200',
        precio: 856,
        stock: 21
    },
    {
        timestamp: 'Apr 4 05:06:09',
        nombre: 'Nike',
        descripcion: 'Mil pequeños peces blancos, Como si hirviera, El color del agua',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 4796,
        stock: 12
    },
    {
        timestamp: 'Apr 4 05:06:09',
        nombre: 'Disney',
        descripcion: 'Pareciera que el sapo, Va a expeler, una nube',
        codigo: 'P0004',
        foto: 'https://picsum.photos/200',
        precio: 1201,
        stock: 16
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Pampers',
        descripcion: 'Mi cuenco de mendigar, Acepta hojas caídas',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 514,
        stock: 1
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Audi',
        descripcion: 'Bajo la lluvia de verano, El sendero, Desapareció',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 2457,
        stock: 15
    }
];
class PersistenciaMongo {
    constructor(local = false) {
        local
            ? (this.server = `mongodb://localhost:27017/${config_1.default.MONGO_LOCAL_DBNAME}`)
            : (this.server = `mongodb+srv://${config_1.default.MONGO_ATLAS_USER}:${config_1.default.MONGO_ATLAS_PASSWORD}@${config_1.default.MONGO_ATLAS_CLUSTER}/${config_1.default.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
        mongoose_1.default.connect(this.server);
        this.products = mongoose_1.default.model(dbCollection, productsSchema);
        this.products.count().then((count) => {
            if (count < 1) {
                console.log('Insertando Data Mockup');
                this.products.insertMany(mockData);
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.products.findById(id);
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
                    const item = yield this.products.findById(id);
                    if (item)
                        output.push(item);
                }
                else
                    output = yield this.products.find();
                return output;
            }
            catch (err) {
                return output;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = {
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                nombre: data.nombre,
                descripcion: data.descripcion || 'Sin descripción',
                codigo: data.codigo || 'P0000',
                foto: data.foto || 'https://picsum.photos/200',
                precio: data.precio,
                stock: data.stock
            };
            const newProduct = new this.products(newItem);
            yield newProduct.save();
            return newProduct;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateItem = data;
            updateItem.timestamp = (0, moment_1.default)().format('MM DD hh:mm:ss');
            return this.products.findByIdAndUpdate(id, updateItem).then(() => this.products.findById(id));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.products.findByIdAndDelete(id);
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (options.nombre)
                query.nombre = options.nombre;
            if (options.codigo)
                query.codigo = options.codigo;
            if (options.precio)
                query.precio = options.precio;
            if (options.stock)
                query.stock = options.stock;
            if (options.precioMax)
                query.precio = { $lte: Number(options.precioMax) };
            if (options.precioMin)
                query.precio = { $gte: Number(options.precioMin) };
            if (options.precioMin && options.precioMax)
                query.precio = { $gte: Number(options.precioMin), $lte: Number(options.precioMax) };
            if (options.stockMax)
                query.stock = { $lte: Number(options.stockMax) };
            if (options.stockMin)
                query.stock = { $gte: Number(options.stockMin) };
            if (options.stockMin && options.stockMax)
                query.stock = { $gte: Number(options.stockMin), $lte: Number(options.stockMax) };
            console.log(query);
            return this.products.find(query);
        });
    }
}
exports.PersistenciaMongo = PersistenciaMongo;
