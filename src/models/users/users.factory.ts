import { PersistenciaMongo } from './DAOs/mongoDAO';
import { logger } from '../../middleware/logger';

export enum Persistencia {
  MongoLocal = 'MONGO-LOCAL',
  MongoAtlas = 'MONGO-ATLAS'
}

export class UsersFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      // Esta dos veces Mongo Atlas para evitar "Error de capa 8"
      case Persistencia.MongoLocal:
        logger.log.info('Usuarios está escribiendo en Mongo Local');
        return new PersistenciaMongo(true);

      case Persistencia.MongoAtlas:
        logger.log.info('Usuarios está escribiendo en Mongo Atlas');
        return new PersistenciaMongo();

      default:
        logger.log.info('Usuarios está escribiendo en Memoria por default');
        return new PersistenciaMongo();
    }
  }
}
