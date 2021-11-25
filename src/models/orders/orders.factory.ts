import { PersistenciaMongo } from './DAOs/mongoDAO';
import { logger } from '../../middleware/logger';

export enum Persistencia {
  MongoLocal = 'MONGO-LOCAL',
  MongoAtlas = 'MONGO-ATLAS'
}

export class OrderFactory {
  // Esto debería ser tipo generico para todos los DAO
  private static instance: PersistenciaMongo;

  private constructor() {}

  static get(tipo: Persistencia) {
    switch (tipo) {
      case Persistencia.MongoLocal:
        logger.log.info('Carrito está escribiendo en Mongo Local');
        if (!OrderFactory.instance) {
          OrderFactory.instance = new PersistenciaMongo(true);
        }
        return OrderFactory.instance;

      case Persistencia.MongoAtlas:
        logger.log.info('Carrito está escribiendo en Mongo Atlas');
        if (!OrderFactory.instance) {
          OrderFactory.instance = new PersistenciaMongo();
        }
        return OrderFactory.instance;

      default:
        logger.log.info('Carrito está escribiendo en Mongo Atlas por default');
        if (!OrderFactory.instance) {
          OrderFactory.instance = new PersistenciaMongo();
        }
        return OrderFactory.instance;
    }
  }
}
