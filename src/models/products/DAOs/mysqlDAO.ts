import knex from 'knex';
import dbConfig from '../../../../knexfile';
import { newProductObject, ProductObject, ProductQuery, ProductBaseClass } from '../products.interfaces';
import moment from 'moment';

const mockData = [
  {
    timestamp: 'Apr 5 05:06:08',
    nombre: 'BMW',
    descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
    codigo: 'P0002',
    foto: 'https://picsum.photos/200',
    precio: 2751,
    stock: 8
  },
  {
    timestamp: 'Apr 5 05:06:08',
    nombre: 'Kleenex',
    descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
    codigo: 'P0005',
    foto: 'https://picsum.photos/200',
    precio: 1898,
    stock: 12
  },
  {
    timestamp: 'Apr 4 05:06:07',
    nombre: 'Johnson & Johnson',
    descripcion: 'Esta primavera en mi cabaña, Absolutamente nada, Absolutamente todo',
    codigo: 'P0002',
    foto: 'https://picsum.photos/200',
    precio: 570,
    stock: 7
  },
  {
    timestamp: 'Apr 5 05:06:08',
    nombre: 'Colgate',
    descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
    codigo: 'P0001',
    foto: 'https://picsum.photos/200',
    precio: 3613,
    stock: 25
  },
  {
    timestamp: 'Apr 5 05:06:08',
    nombre: 'Pampers',
    descripcion: 'Anoche cubrí, mis hijos dormidos, y el ruido del mar.',
    codigo: 'P0003',
    foto: 'https://picsum.photos/200',
    precio: 856,
    stock: 21
  },
  {
    timestamp: 'Apr 4 05:06:09',
    nombre: 'Nike',
    descripcion: 'Mil pequeños peces blancos, Como si hirviera, El color del agua',
    codigo: 'P0005',
    foto: 'https://picsum.photos/200',
    precio: 4796,
    stock: 12
  },
  {
    timestamp: 'Apr 4 05:06:09',
    nombre: 'Disney',
    descripcion: 'Pareciera que el sapo, Va a expeler, una nube',
    codigo: 'P0004',
    foto: 'https://picsum.photos/200',
    precio: 1201,
    stock: 16
  },
  {
    timestamp: 'Apr 5 05:06:08',
    nombre: 'Pampers',
    descripcion: 'Mi cuenco de mendigar, Acepta hojas caídas',
    codigo: 'P0005',
    foto: 'https://picsum.photos/200',
    precio: 514,
    stock: 1
  },
  {
    timestamp: 'Apr 5 05:06:08',
    nombre: 'Audi',
    descripcion: 'Bajo la lluvia de verano, El sendero, Desapareció',
    codigo: 'P0002',
    foto: 'https://picsum.photos/200',
    precio: 2457,
    stock: 15
  }
];

export class PersistenciaMysql implements ProductBaseClass {
  private products: any;
  private table = 'productos';

  constructor() {
    const environment = process.env.NODE_ENV || 'productos_sql_dev';
    console.log(`SETTING ${environment} DB`);
    const options = dbConfig[environment];
    this.products = knex(options);
    this.products.schema.hasTable(this.table).then((exists: any) => {
      if (!exists) {
        console.log('SQL: Initializing table "productos"');
        this.products.schema
          .createTable('productos', (productosTable: any) => {
            productosTable.increments('_id');
            productosTable.string('timestamp').notNullable();
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.string('codigo').notNullable();
            productosTable.string('foto').notNullable();
            productosTable.decimal('precio', 8, 2).notNullable();
            productosTable.integer('stock').notNullable();
          })
          .then(() => {
            mockData.forEach(async (item) => await this.products(this.table).insert(item));
            console.log('SQL: Done creating table "productos" & Mockup Data');
          });
      }
    });
  }

  async find(id: number): Promise<Boolean> {
    const item: any = await this.products(this.table).where('_id', Number(id));
    if (item == 0) return false;
    return true;
  }

  async get(id?: string): Promise<ProductObject[]> {
    if (id) return await this.products(this.table).where('_id', Number(id));
    return await this.products(this.table);
  }

  async add(data: newProductObject): Promise<ProductObject> {
    const newItemData: ProductObject = {
      timestamp: moment().format('MM DD hh:mm:ss'),
      nombre: data.nombre!,
      descripcion: data.descripcion || 'Sin descripción',
      codigo: data.codigo || 'P0000',
      foto: data.foto || 'https://picsum.photos/200',
      precio: data.precio!,
      stock: data.stock!
    };
    const newItem = await this.products(this.table).insert(newItemData);
    return await this.products(this.table).where('_id', Number(newItem));
  }

  async update(id: string, data: newProductObject): Promise<ProductObject> {
    const updateItem: any = data;
    updateItem.timestamp = moment().format('MM DD hh:mm:ss');
    await this.products(this.table).where('_id', Number(id)).update(updateItem);
    return await this.products(this.table).where('_id', Number(id));
  }

  async delete(id: string) {
    await this.products(this.table).where('_id', Number(id)).del();
  }

  async query(options: ProductQuery): Promise<ProductObject[]> {
    return await this.products(this.table).where((builder: any) => {
      if (options.nombre) builder.where({ nombre: options.nombre });
      if (options.codigo) builder.where({ codigo: options.codigo });
      if (options.precio) builder.where({ precio: options.precio });
      if (options.precioMin) builder.where('precio', '>=', options.precioMin);
      if (options.precioMax) builder.where('precio', '<=', options.precioMax);
      if (options.precioMin && options.precioMax)
        builder.where('precio', '>=', options.precioMin).andWhere('precio', '<=', options.precioMax);
      if (options.stock) builder.where({ stock: options.stock });
      if (options.stockMin) builder.where('stock', '>=', options.stockMin);
      if (options.stockMax) builder.where('stock', '<=', options.stockMax);
      if (options.stockMin && options.stockMax)
        builder.where('stock', '>=', options.stockMin).andWhere('stock', '<=', options.stockMax);
    });
  }
}
// export const productosDBService = new PersistenciaMongo();
