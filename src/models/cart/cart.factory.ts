import { PersistenciaMemoria } from './DAOs/memoryDAO';
import { PersistenciaFS } from './DAOs/fsDAO';
import { PersistenciaMongo } from './DAOs/mongoDAO';
import { PersistenciaMysql } from './DAOs/mySqlDAO';
import { PersistenciaSQLite3 } from './DAOs/sqlite3DAO';
import { PersistenciaFirebase } from './DAOs/firebaseDAO';

import path from 'path';

export enum Persistencia {
  Memory = 'MEMORY', //Tests: getOK, get_idOK, PostOK, DeleteOK
  FilesSystem = 'FS', //Tests: getOK, get_idOK, PostOK, DeleteOK
  MongoLocal = 'MONGO-LOCAL', //Tests: getOK, get_idOK, PostOK, DeleteOK
  MongoAtlas = 'MONGO-ATLAS', //Tests: getOK, get_idOK, PostOK, DeleteOK
  Mysql = 'MYSQL', //Tests: getOK, get_idOK, PostOK, DeleteOK
  SqlLite3 = 'SQL-LITE3', //Tests: getOK, get_idOK, PostOK, DeleteOK
  Firebase = 'FIREBASE' //Tests: getOK, get_idOK, PostOK, DeleteOK
}

export class CartFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      // Esta dos veces memoria para evitar "Error de capa 8"
      case Persistencia.Memory:
        console.log('Carrito está escribiendo en Memoria');
        return new PersistenciaMemoria();

      case Persistencia.FilesSystem:
        console.log('Carrito está escribiendo en File System');
        const filePath = path.resolve(__dirname, '../../../assets/savedCart.json');
        return new PersistenciaFS(filePath);

      case Persistencia.MongoLocal:
        console.log('Carrito está escribiendo en Mongo Local');
        return new PersistenciaMongo(true);

      case Persistencia.MongoAtlas:
        console.log('Carrito está escribiendo en Mongo Atlas');
        return new PersistenciaMongo();

      case Persistencia.Mysql:
        console.log('Carrito está escribiendo en MysqlLocal');
        return new PersistenciaMysql();

      case Persistencia.SqlLite3:
        console.log('Carrito está escribiendo en SQLite3');
        return new PersistenciaSQLite3();

      case Persistencia.Firebase:
        console.log('Carrito está escribiendo en Firebase');
        return new PersistenciaFirebase();

      default:
        console.log('Carrito está escribiendo en Memoria por default');
        return new PersistenciaMemoria();
    }
  }
}
