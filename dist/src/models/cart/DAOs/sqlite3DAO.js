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
    { timestamp: 'Apr 4 05:06:07', producto: 5 },
    { timestamp: 'Apr 6 05:06:08', producto: 4 },
    { timestamp: 'Apr 6 05:06:08', producto: 3 }
];
class PersistenciaSQLite3 {
    constructor() {
        this.table = 'carrito';
        const environment = process.env.NODE_ENV || 'ecommerce_sqLite3_dev';
        logger_1.logger.log.info(`SETTING ${environment} DB`);
        const options = knexfile_1.default[environment];
        this.carrito = (0, knex_1.default)(options);
        this.carrito.schema.hasTable(this.table).then((exists) => {
            if (!exists) {
                logger_1.logger.log.warn('SQLITE: Initializing table "carrito"');
                this.carrito.schema
                    .createTable(this.table, (carritoTable) => {
                    carritoTable.increments('_id');
                    carritoTable.string('timestamp').notNullable();
                    // Podría meter los datos del json en la tabla carrito. Pero la buena practica es hacerlo con una referencia. Como esta en la linea de abajo.
                    // carritoTable.json('producto').notNullable();
                    // producto hace referencia al id de la tabla productos
                    carritoTable.integer('producto').unsigned().index().references('_id').inTable('productos').notNullable();
                })
                    .then(() => {
                    mockData.forEach((item) => __awaiter(this, void 0, void 0, function* () { return yield this.carrito(this.table).insert(item); }));
                    logger_1.logger.log.info('SQL: Done creating table "carrito" & Mockup Data');
                });
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.carrito(this.table).where('_id', Number(id));
            if (item == 0)
                return false;
            return true;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                return yield this.carrito(this.table).where('_id', Number(id));
            return yield this.carrito(this.table);
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItemData = {
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                producto: data[0]._id
            };
            const newItem = yield this.carrito(this.table).insert(newItemData);
            return (yield this.carrito(this.table).where('_id', Number(newItem)));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.carrito(this.table).where('_id', Number(id)).del();
        });
    }
}
exports.PersistenciaSQLite3 = PersistenciaSQLite3;
