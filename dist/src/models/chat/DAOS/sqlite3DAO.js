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
class PersistenciaSQLite3 {
    constructor() {
        this.table = 'chatLog';
        const environment = process.env.NODE_ENV || 'ecommerce_sqLite3_dev';
        console.log(`SETTING ${environment} DB`);
        const options = knexfile_1.default[environment];
        this.chat = (0, knex_1.default)(options);
        this.chat.schema.hasTable(this.table).then((exists) => {
            if (!exists) {
                console.log('SQLITE: Initializing table "chatLog"');
                this.chat.schema
                    .createTable(this.table, (chatTable) => {
                    chatTable.increments('_id');
                    chatTable.string('timestamp').notNullable();
                    chatTable.string('nombre').notNullable();
                    chatTable.string('mensaje');
                })
                    .then(() => {
                    console.log('SQL: Done creating table "chatLog"');
                });
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.chat(this.table).where('_id', Number(id));
            if (item == 0)
                return false;
            return true;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItemData = {
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                nombre: data.nombre,
                mensaje: data.mensaje
            };
            const newItem = yield this.chat(this.table).insert(newItemData);
            return (yield this.chat(this.table).where('_id', Number(newItem)));
        });
    }
}
exports.PersistenciaSQLite3 = PersistenciaSQLite3;
