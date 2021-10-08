"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersFactory = exports.Persistencia = void 0;
const mongoDAO_1 = require("./DAOs/mongoDAO");
var Persistencia;
(function (Persistencia) {
    Persistencia["MongoLocal"] = "MONGO-LOCAL";
    Persistencia["MongoAtlas"] = "MONGO-ATLAS";
})(Persistencia = exports.Persistencia || (exports.Persistencia = {}));
class UsersFactory {
    static get(tipo) {
        switch (tipo) {
            // Esta dos veces Mongo Atlas para evitar "Error de capa 8"
            case Persistencia.MongoLocal:
                console.log('Usuarios está escribiendo en Mongo Local');
                return new mongoDAO_1.PersistenciaMongo(true);
            case Persistencia.MongoAtlas:
                console.log('Usuarios está escribiendo en Mongo Atlas');
                return new mongoDAO_1.PersistenciaMongo();
            default:
                console.log('Usuarios está escribiendo en Memoria por default');
                return new mongoDAO_1.PersistenciaMongo();
        }
    }
}
exports.UsersFactory = UsersFactory;
