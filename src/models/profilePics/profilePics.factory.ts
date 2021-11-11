import { PersistenciaMongo } from './DAOs/mongoDAO';
import { logger } from '../../middleware/logger';

export enum Persistencia {
  MongoAtlas = 'MONGO-ATLAS'
}

export class ProfilePicFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      case Persistencia.MongoAtlas:
        logger.log.info('Carrito está escribiendo en Mongo Atlas');
        return new PersistenciaMongo();

      default:
        logger.log.info('Carrito está escribiendo en Memoria por default');
        return new PersistenciaMongo();
    }
  }
}
