import { PersistenciaMongo } from './DAOs/mongoDAO';

export enum Persistencia {
  MongoLocal = 'MONGO-LOCAL',
  MongoAtlas = 'MONGO-ATLAS'
}

export class UsersFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      // Esta dos veces Mongo Atlas para evitar "Error de capa 8"
      case Persistencia.MongoLocal:
        console.log('Usuarios está escribiendo en Mongo Local');
        return new PersistenciaMongo(true);

      case Persistencia.MongoAtlas:
        console.log('Usuarios está escribiendo en Mongo Atlas');
        return new PersistenciaMongo();

      default:
        console.log('Usuarios está escribiendo en Memoria por default');
        return new PersistenciaMongo();
    }
  }
}
