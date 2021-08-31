"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySQLDB = exports.sqliteDB = void 0;
const knex_1 = __importDefault(require("knex"));
exports.sqliteDB = (0, knex_1.default)({
    client: 'sqlite3',
    connection: { filename: '../../db/mensajes.sqlite' },
    useNullAsDefault: true
});
exports.mySQLDB = (0, knex_1.default)({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'db_coderhouse'
    },
    pool: { min: 0, max: 7 }
});
exports.sqliteDB.schema.hasTable('cars').then((exists) => {
    if (!exists) {
        console.log('NO EXISTE LA TABLA CARS. VAMOS A CREARLA');
        exports.sqliteDB.schema
            .createTable('cars', (table) => {
            table.increments('id');
            table.string('name');
            table.integer('año');
        })
            .then(() => {
            console.log('DONE');
        });
    }
});
exports.mySQLDB.schema.hasTable('productos').then((exists) => {
    if (!exists) {
        console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
        exports.mySQLDB.schema
            .createTable('productos', (productosTable) => {
            productosTable.increments();
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.integer('stock').notNullable();
            productosTable.decimal('precio', 4, 2);
        })
            .then(() => {
            console.log('DONE');
        });
    }
});
