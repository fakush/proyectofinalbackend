import { PersistenciaMemoria } from './DAOs/memoryDAO';
import { PersistenciaFS } from './DAOs/fsDAO';
import { PersistenciaMongo } from './DAOs/mongoDAO';
import { PersistenciaMysql } from './DAOs/mysqlDAO';
import { PersistenciaSQLite3 } from './DAOs/sqlite3DAO';
import { PersistenciaFirebase } from './DAOs/firebaseDAO';

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
        console.log('Estoy escribiendo en Memoria');
        return new PersistenciaMemoria();

      case Persistencia.FilesSystem:
        console.log('Estoy escribiendo en File System');
        const filePath = path.resolve(__dirname, '../../../assets/productList.json');
        return new PersistenciaFS(filePath);

      case Persistencia.MongoLocal:
        console.log('Estoy escribiendo en Mongo Local');
        return new PersistenciaMongo(true);

      case Persistencia.MongoAtlas:
        console.log('Estoy escribiendo en Mongo Atlas');
        return new PersistenciaMongo();

      case Persistencia.Mysql:
        console.log('Estoy escribiendo en MysqlLocal');
        return new PersistenciaMysql();

      case Persistencia.SqlLite3:
        console.log('Estoy escribiendo en SQLite3');
        return new PersistenciaSQLite3();

      case Persistencia.Firebase:
        console.log('Estoy escribiendo en Firebase');
        return new PersistenciaFirebase();

      default:
        return new PersistenciaMemoria();
    }
  }
}
