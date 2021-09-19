import { PersistenciaMemoria } from './DAOs/memoryDAO';
import { PersistenciaFS } from './DAOs/fsDAO';
import { PersistenciaMongo } from './DAOs/mongoDAO';

import path from 'path';

export enum Persistencia {
  Memoria = 'MEMORY', //Done
  FilesSystem = 'FS', //Done
  MongoLocal = 'MONGO-LOCAL', //Done
  MongoAtlas = 'MONGO-ATLAS', //Done
  Mysql = 'MYSQL', //get?, get_id?, get_query?, Post?, Put?, Delete?
  SqlLite3 = 'SQL-LITE3', //get?, get_id?, get_query?, Post?, Put?, Delete?
  Firebase = 'FIREBASE' //get?, get_id?, get_query?, Post?, Put?, Delete?
}

export class ProductsFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      // Esta dos veces memoria para evitar "Error de capa 8"
      case Persistencia.Memoria:
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

      default:
        return new PersistenciaMemoria();
    }
  }
}
