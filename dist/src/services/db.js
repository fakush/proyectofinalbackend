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
exports.MySqliteDBService = exports.mySQLdbService = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
class MySQLdb {
    constructor() {
        const environment = process.env.NODE_ENV || 'productos_dev';
        console.log(`SETTING ${environment} DB`);
        const options = knexfile_1.default[environment];
        this.connection = (0, knex_1.default)(options);
    }
    init() {
        this.connection.schema.hasTable('productos').then((exists) => {
            if (!exists) {
                console.log('SQL: Initializing table "productos"');
                this.connection.schema
                    .createTable('productos', (productosTable) => {
                    productosTable.increments('id');
                    productosTable.string('timestamp').notNullable();
                    productosTable.string('nombre').notNullable();
                    productosTable.string('descripcion').notNullable();
                    productosTable.string('codigo').notNullable();
                    productosTable.string('foto').notNullable();
                    productosTable.decimal('precio', 8, 2).notNullable();
                    productosTable.integer('stock').notNullable();
                })
                    .then(() => {
                    console.log('SQL: Done creating table "productos"');
                });
            }
        });
    }
    find(tableName, id) {
        return new Promise((resolve) => resolve(this.connection(tableName).where('id', id)));
    }
    get(tableName, id = null) {
        if (id)
            return new Promise((resolve) => resolve(this.connection(tableName).where('id', id)));
        return new Promise((resolve) => resolve(this.connection(tableName)));
    }
    create(tableName, data) {
        return new Promise((resolve) => resolve(this.connection(tableName).insert(data)));
    }
    update(tableName, id, data) {
        return new Promise((resolve) => resolve(this.connection(tableName).where('id', id).update(data)));
    }
    delete(tableName, id) {
        return new Promise((resolve) => resolve(this.connection(tableName).where('id', id).del()));
    }
}
exports.mySQLdbService = new MySQLdb();
class MySqliteDB {
    constructor() {
        const environment = process.env.NODE_ENV || 'mensajes_dev';
        console.log(`SETTING ${environment} DB`);
        const options = knexfile_1.default[environment];
        this.connection = (0, knex_1.default)(options);
    }
    init() {
        this.connection.schema.hasTable('chat_log').then((exists) => {
            if (!exists) {
                console.log('SQLITE: Initializing table "chat_log"');
                this.connection.schema
                    .createTable('chat_log', (table) => {
                    table.increments('id');
                    table.date('timestamp');
                    table.string('user');
                    table.string('message');
                })
                    .then(() => {
                    console.log('SQLITE: DONE');
                });
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection('chat_log').insert(data);
        });
    }
}
exports.MySqliteDBService = new MySqliteDB();
