import knex from 'knex';
import dbConfig from '../../knexfile';

class MySQLdb {
  connection: any;

  constructor() {
    const environment = process.env.NODE_ENV || 'productos_dev';
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable('productos').then((exists: any) => {
      if (!exists) {
        console.log('SQL: Initializing table "productos"');
        this.connection.schema
          .createTable('productos', (productosTable: any) => {
            productosTable.increments('id');
            productosTable.string('timestamp').notNullable();
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.string('codigo').notNullable();
            productosTable.string('foto').notNullable();
            productosTable.decimal('precio', 8, 2).notNullable();
            productosTable.integer('stock').notNullable();
          })
          .then(() => {
            console.log('SQL: Done creating table "productos"');
          });
      }
    });
  }

  find(tableName: string, id: number) {
    return new Promise((resolve) => resolve(this.connection(tableName).where('id', id)));
  }

  get(tableName: string, id: number | null = null) {
    if (id) return new Promise((resolve) => resolve(this.connection(tableName).where('id', id)));
    return new Promise((resolve) => resolve(this.connection(tableName)));
  }

  create(tableName: string, data: any) {
    return new Promise((resolve) => resolve(this.connection(tableName).insert(data)));
  }

  update(tableName: string, id: number, data: any) {
    return new Promise((resolve) => resolve(this.connection(tableName).where('id', id).update(data)));
  }

  delete(tableName: string, id: number) {
    return new Promise((resolve) => resolve(this.connection(tableName).where('id', id).del()));
  }
}
export const mySQLdbService = new MySQLdb();

class MySqliteDB {
  connection: any;
  constructor() {
    const environment = process.env.NODE_ENV || 'mensajes_dev';
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable('chat_log').then((exists: any) => {
      if (!exists) {
        console.log('SQLITE: Initializing table "chat_log"');
        this.connection.schema
          .createTable('chat_log', (table: any) => {
            table.increments('id');
            table.date('timestamp');
            table.string('user');
            table.string('message');
          })
          .then(() => {
            console.log('SQLITE: DONE');
          });
      }
    });
  }

  async create(data: any) {
    return this.connection('chat_log').insert(data);
  }
}
export const MySqliteDBService = new MySqliteDB();
