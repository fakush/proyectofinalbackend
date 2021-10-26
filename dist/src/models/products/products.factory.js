"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsFactory = exports.Persistencia = void 0;
const memoryDAO_1 = require("./DAOs/memoryDAO");
const fsDAO_1 = require("./DAOs/fsDAO");
const mongoDAO_1 = require("./DAOs/mongoDAO");
const mysqlDAO_1 = require("./DAOs/mysqlDAO");
const sqlite3DAO_1 = require("./DAOs/sqlite3DAO");
const firebaseDAO_1 = require("./DAOs/firebaseDAO");
const logger_1 = require("../../middleware/logger");
const path_1 = __importDefault(require("path"));
var Persistencia;
(function (Persistencia) {
    Persistencia["Memory"] = "MEMORY";
    Persistencia["FilesSystem"] = "FS";
    Persistencia["MongoLocal"] = "MONGO-LOCAL";
    Persistencia["MongoAtlas"] = "MONGO-ATLAS";
    Persistencia["Mysql"] = "MYSQL";
    Persistencia["SqlLite3"] = "SQL-LITE3";
    Persistencia["Firebase"] = "FIREBASE"; //Tests: getOK, get_idOK, get_queryOK, get_query_rangeOK, PostOK, PutOK, DeleteOK
})(Persistencia = exports.Persistencia || (exports.Persistencia = {}));
class ProductsFactory {
    static get(tipo) {
        switch (tipo) {
            // Esta dos veces memoria para evitar "Error de capa 8"
            case Persistencia.Memory:
                logger_1.logger.log.info('Productos está escribiendo en Memoria');
                return new memoryDAO_1.PersistenciaMemoria();
            case Persistencia.FilesSystem:
                logger_1.logger.log.info('Productos está escribiendo en File System');
                const filePath = path_1.default.resolve(__dirname, '../../../assets/productList.json');
                return new fsDAO_1.PersistenciaFS(filePath);
            case Persistencia.MongoLocal:
                logger_1.logger.log.info('Productos está escribiendo en Mongo Local');
                return new mongoDAO_1.PersistenciaMongo(true);
            case Persistencia.MongoAtlas:
                logger_1.logger.log.info('Productos está escribiendo en Mongo Atlas');
                return new mongoDAO_1.PersistenciaMongo();
            case Persistencia.Mysql:
                logger_1.logger.log.info('Productos está escribiendo en MysqlLocal');
                return new mysqlDAO_1.PersistenciaMysql();
            case Persistencia.SqlLite3:
                logger_1.logger.log.info('Productos está escribiendo en SQLite3');
                return new sqlite3DAO_1.PersistenciaSQLite3();
            case Persistencia.Firebase:
                logger_1.logger.log.info('Productos está escribiendo en Firebase');
                return new firebaseDAO_1.PersistenciaFirebase();
            default:
                logger_1.logger.log.info('Productos está escribiendo en Memoria por default');
                return new memoryDAO_1.PersistenciaMemoria();
        }
    }
}
exports.ProductsFactory = ProductsFactory;
