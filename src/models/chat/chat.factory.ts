import { PersistenciaSQLite3 } from './DAOS/sqlite3DAO';

export enum Persistencia {
  SqlLite3 = 'SQL-LITE3'
}

export class ChatFactory {
  static get(tipo: Persistencia) {
    switch (tipo) {
      case Persistencia.SqlLite3:
        console.log('Chat está escribiendo en SQLite3');
        return new PersistenciaSQLite3();

      default:
        console.log('Chat está escribiendo en Memoria por default');
        return new PersistenciaSQLite3();
    }
  }
}
