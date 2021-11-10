import { PersistenciaMongo } from './DAOs/mongoDAO';
import { logger } from '../../middleware/logger';

export enum Persistencia {
  MongoLocal = 'MONGO-LOCAL',
  MongoAtlas = 'MONGO-ATLAS'
}

export class OrderFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      case Persistencia.MongoLocal:
        logger.log.info('Carrito está escribiendo en Mongo Local');
        return new PersistenciaMongo(true);

      case Persistencia.MongoAtlas:
        logger.log.info('Carrito está escribiendo en Mongo Atlas');
        return new PersistenciaMongo();

      default:
        logger.log.info('Carrito está escribiendo en Mongo Atlas por default');
        return new PersistenciaMongo();
    }
  }
}
