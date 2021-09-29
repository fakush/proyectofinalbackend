"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatFactory = exports.Persistencia = void 0;
// import { PersistenciaSQLite3 } from './DAOS/sqlite3DAO';
const mongoDAO_1 = require("./DAOS/mongoDAO");
var Persistencia;
(function (Persistencia) {
    // SqlLite3 = 'SQL-LITE3',
    Persistencia["MongoLocal"] = "MONGO-LOCAL";
    Persistencia["MongoAtlas"] = "MONGO-ATLAS";
})(Persistencia = exports.Persistencia || (exports.Persistencia = {}));
class ChatFactory {
    static get(tipo) {
        switch (tipo) {
            // case Persistencia.SqlLite3:
            //   console.log('Chat está escribiendo en SQLite3');
            //   return new PersistenciaSQLite3();
            case Persistencia.MongoLocal:
                console.log('Chat está escribiendo en MongoDB Local');
                return new mongoDAO_1.PersistenciaMongo(true);
            case Persistencia.MongoAtlas:
                console.log('Chat está escribiendo en MongoDB Local');
                return new mongoDAO_1.PersistenciaMongo();
            default:
                console.log('Chat está escribiendo en MongoDB Local por default');
                return new mongoDAO_1.PersistenciaMongo(true);
        }
    }
}
exports.ChatFactory = ChatFactory;
