// import knex from 'knex';
// import dbConfig from '../../../../knexfile';
// import { newCartObject, CartObject, CartBaseClass } from '../cart.interfaces';
// import moment from 'moment';
// import { logger } from '../../../middleware/logger';

// const mockData = [
//   { timestamp: 'Apr 4 05:06:07', producto: 5 },
//   { timestamp: 'Apr 6 05:06:08', producto: 4 },
//   { timestamp: 'Apr 6 05:06:08', producto: 3 }
// ];

// export class PersistenciaMysql implements CartBaseClass {
//   private carrito;
//   private table = 'carrito';

//   constructor() {
//     const environment = process.env.NODE_ENV || 'ecommerce_sql_dev';
//     logger.log.info(`SETTING ${environment} DB`);
//     const options = dbConfig[environment];
//     this.carrito = knex(options);
//     this.carrito.schema.hasTable(this.table).then((exists: any) => {
//       if (!exists) {
//         logger.log.warn('SQL: Initializing table "carrito"');
//         this.carrito.schema
//           .createTable(this.table, (carritoTable: any) => {
//             carritoTable.increments('_id');
//             carritoTable.string('timestamp').notNullable();
//             // Podría meter los datos del json en la tabla carrito. Pero la buena practica es hacerlo con una referencia. Como esta en la linea de abajo.
//             // carritoTable.json('producto').notNullable();
//             // producto hace referencia al id de la tabla productos
//             carritoTable.integer('producto').unsigned().index().references('_id').inTable('productos').notNullable();
//           })
//           .then(() => {
//             mockData.forEach(async (item) => await this.carrito(this.table).insert(item));
//             logger.log.info('SQL: Done creating table "carrito" & Mockup Data');
//           });
//       }
//     });
//   }

//   async find(id: number): Promise<Boolean> {
//     const item: any = await this.carrito(this.table).where('_id', Number(id));
//     if (item == 0) return false;
//     return true;
//   }

//   async get(id?: string): Promise<CartObject[]> {
//     if (id) return await this.carrito(this.table).where('_id', Number(id));
//     return await this.carrito(this.table);
//   }

//   async add(data: newCartObject): Promise<CartObject> {
//     const newItemData: CartObject = {
//       timestamp: moment().format('MM DD hh:mm:ss'),
//       producto: data[0]._id
//     };
//     const newItem = await this.carrito(this.table).insert(newItemData);
//     return (await this.carrito(this.table).where('_id', Number(newItem))) as any;
//   }

//   async delete(id: string): Promise<void> {
//     await this.carrito(this.table).where('_id', Number(id)).del();
//   }
// }
