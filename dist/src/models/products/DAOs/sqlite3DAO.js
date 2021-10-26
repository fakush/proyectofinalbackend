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
exports.PersistenciaSQLite3 = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../../../knexfile"));
const moment_1 = __importDefault(require("moment"));
const logger_1 = require("../../../middleware/logger");
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
class PersistenciaSQLite3 {
    constructor() {
        this.table = 'productos';
        const environment = process.env.NODE_ENV || 'ecommerce_sqLite3_dev';
        logger_1.logger.log.info(`SETTING ${environment} DB`);
        const options = knexfile_1.default[environment];
        this.products = (0, knex_1.default)(options);
        this.products.schema.hasTable(this.table).then((exists) => {
            if (!exists) {
                logger_1.logger.log.warn('SQLITE: Initializing table "productos"');
                this.products.schema
                    .createTable('productos', (productosTable) => {
                    productosTable.increments('_id');
                    productosTable.string('timestamp').notNullable();
                    productosTable.string('nombre').notNullable();
                    productosTable.string('descripcion').notNullable();
                    productosTable.string('codigo').notNullable();
                    productosTable.string('foto').notNullable();
                    productosTable.decimal('precio', 8, 2).notNullable();
                    productosTable.integer('stock').notNullable();
                })
                    .then(() => {
                    mockData.forEach((item) => __awaiter(this, void 0, void 0, function* () { return yield this.products(this.table).insert(item); }));
                    logger_1.logger.log.info('SQLITE: Done creating table "productos" & Mockup Data');
                });
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.products(this.table).where('_id', Number(id));
            if (item == 0)
                return false;
            return true;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                return yield this.products(this.table).where('_id', Number(id));
            return yield this.products(this.table);
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItemData = {
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                nombre: data.nombre,
                descripcion: data.descripcion || 'Sin descripción',
                codigo: data.codigo || 'P0000',
                foto: data.foto || 'https://picsum.photos/200',
                precio: data.precio,
                stock: data.stock
            };
            const newItem = yield this.products(this.table).insert(newItemData);
            return yield this.products(this.table).where('_id', Number(newItem));
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateItem = data;
            updateItem.timestamp = (0, moment_1.default)().format('MM DD hh:mm:ss');
            yield this.products(this.table).where('_id', Number(id)).update(updateItem);
            return yield this.products(this.table).where('_id', Number(id));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.products(this.table).where('_id', Number(id)).del();
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.products(this.table).where((builder) => {
                if (options.nombre)
                    builder.where({ nombre: options.nombre });
                if (options.codigo)
                    builder.where({ codigo: options.codigo });
                if (options.precio)
                    builder.where({ precio: options.precio });
                if (options.precioMin)
                    builder.where('precio', '>=', options.precioMin);
                if (options.precioMax)
                    builder.where('precio', '<=', options.precioMax);
                if (options.precioMin && options.precioMax)
                    builder.where('precio', '>=', options.precioMin).andWhere('precio', '<=', options.precioMax);
                if (options.stock)
                    builder.where({ stock: options.stock });
                if (options.stockMin)
                    builder.where('stock', '>=', options.stockMin);
                if (options.stockMax)
                    builder.where('stock', '<=', options.stockMax);
                if (options.stockMin && options.stockMax)
                    builder.where('stock', '>=', options.stockMin).andWhere('stock', '<=', options.stockMax);
            });
        });
    }
}
exports.PersistenciaSQLite3 = PersistenciaSQLite3;
