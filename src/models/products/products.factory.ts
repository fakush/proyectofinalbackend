import { PersistenciaMongo } from './DAOs/mongoDAO';
import { PersistenciaMemoria } from './DAOs/memoryDAO';
import path from 'path';

export enum Persistencia {
  Memoria = 'MEMORY',
  FilesSystem = 'FS',
  MongoLocal = 'MONGO-LOCAL',
  MongoAtlas = 'MONGO-ATLAS'
}

export class ProductsFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      case Persistencia.Memoria:
        return new PersistenciaMemoria();

      case Persistencia.FilesSystem:
        return console.log('Entro a FS');

      case Persistencia.MongoLocal:
        return new PersistenciaMongo(true);

      case Persistencia.MongoAtlas:
        return new PersistenciaMongo();

      default:
        return new PersistenciaMemoria();
    }
  }
}
