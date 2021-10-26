import { PersistenciaMemoria } from './DAOs/memoryDAO';
import { PersistenciaFS } from './DAOs/fsDAO';
import { PersistenciaMongo } from './DAOs/mongoDAO';
import { PersistenciaMysql } from './DAOs/mysqlDAO';
import { PersistenciaSQLite3 } from './DAOs/sqlite3DAO';
import { PersistenciaFirebase } from './DAOs/firebaseDAO';
import { logger } from '../../middleware/logger';

import path from 'path';

export enum Persistencia {
  Memory = 'MEMORY', //Tests: getOK, get_idOK, get_queryOK, get_query_rangeOK, PostOK, PutOK, DeleteOK
  FilesSystem = 'FS', //Tests: getOK, get_idOK, get_queryOK, get_query_rangeOK, PostOK, PutOK, DeleteOK
  MongoLocal = 'MONGO-LOCAL', //Tests: getOK, get_idOK, get_queryOK, get_query_rangeOK, PostOK, PutOK, DeleteOK
  MongoAtlas = 'MONGO-ATLAS', //Tests: getOK, get_idOK, get_queryOK, get_query_rangeOK, PostOK, PutOK, DeleteOK
  Mysql = 'MYSQL', //Tests: getOK, get_idOK, get_queryOK, get_query_rangeOK, PostOK, PutOK, DeleteOK
  SqlLite3 = 'SQL-LITE3', //Tests: getOK, get_idOK, get_queryOK, get_query_range?, PostOK, PutOK, DeleteOK
  Firebase = 'FIREBASE' //Tests: getOK, get_idOK, get_queryOK, get_query_rangeOK, PostOK, PutOK, DeleteOK
}

export class ProductsFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      // Esta dos veces memoria para evitar "Error de capa 8"
      case Persistencia.Memory:
        logger.log.info('Productos está escribiendo en Memoria');
        return new PersistenciaMemoria();

      case Persistencia.FilesSystem:
        logger.log.info('Productos está escribiendo en File System');
        const filePath = path.resolve(__dirname, '../../../assets/productList.json');
        return new PersistenciaFS(filePath);

      case Persistencia.MongoLocal:
        logger.log.info('Productos está escribiendo en Mongo Local');
        return new PersistenciaMongo(true);

      case Persistencia.MongoAtlas:
        logger.log.info('Productos está escribiendo en Mongo Atlas');
        return new PersistenciaMongo();

      case Persistencia.Mysql:
        logger.log.info('Productos está escribiendo en MysqlLocal');
        return new PersistenciaMysql();

      case Persistencia.SqlLite3:
        logger.log.info('Productos está escribiendo en SQLite3');
        return new PersistenciaSQLite3();

      case Persistencia.Firebase:
        logger.log.info('Productos está escribiendo en Firebase');
        return new PersistenciaFirebase();

      default:
        logger.log.info('Productos está escribiendo en Memoria por default');
        return new PersistenciaMemoria();
    }
  }
}
