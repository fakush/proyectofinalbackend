// import { PersistenciaSQLite3 } from './DAOS/sqlite3DAO';
import { PersistenciaMongo } from './DAOS/mongoDAO';
import { logger } from '../../middleware/logger';

export enum Persistencia {
  // SqlLite3 = 'SQL-LITE3',
  MongoLocal = 'MONGO-LOCAL',
  MongoAtlas = 'MONGO-ATLAS'
}

export class ChatFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      // case Persistencia.SqlLite3:
      //   logger.log.info('Chat está escribiendo en SQLite3');
      //   return new PersistenciaSQLite3();
      case Persistencia.MongoLocal:
        logger.log.info('Chat está escribiendo en MongoDB Local');
        return new PersistenciaMongo(true);

      case Persistencia.MongoAtlas:
        logger.log.info('Chat está escribiendo en MongoDB Local');
        return new PersistenciaMongo();

      default:
        logger.log.info('Chat está escribiendo en MongoDB Local por default');
        return new PersistenciaMongo(true);
    }
  }
}
