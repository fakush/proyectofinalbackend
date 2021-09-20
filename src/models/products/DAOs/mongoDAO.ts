import mongoose from 'mongoose';
import Config from '../../../config';
import { newProductObject, ProductObject, ProductQuery, ProductBaseClass } from '../products.interfaces';
import moment from 'moment';

//MongoSchema
const productsSchema = new mongoose.Schema<ProductObject>({
  timestamp: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, default: 'Sin descripción' },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

const dbCollection = 'productos';

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

export class PersistenciaMongo implements ProductBaseClass {
  private server: string;
  private products;

  constructor(local: boolean = false) {
    local
      ? (this.server = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`)
      : (this.server = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
    mongoose.connect(this.server);
    this.products = mongoose.model<ProductObject>(dbCollection, productsSchema);
    this.products.count().then((count) => {
      if (count < 1) {
        console.log('Insertando Data Mockup');
        this.products.insertMany(mockData);
      }
    });
  }

  async find(id: string): Promise<Boolean> {
    const item: any = await this.products.findById(id);
    if (item == 0) return false;
    return true;
  }

  async get(id?: string): Promise<ProductObject[]> {
    let output: ProductObject[] = [];
    try {
      if (id) {
        const item = await this.products.findById(id);
        if (item) output.push(item);
      } else output = await this.products.find();
      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data: newProductObject): Promise<ProductObject> {
    const newItem: ProductObject = {
      timestamp: moment().format('MM DD hh:mm:ss'),
      nombre: data.nombre!,
      descripcion: data.descripcion || 'Sin descripción',
      codigo: data.codigo || 'P0000',
      foto: data.foto || 'https://picsum.photos/200',
      precio: data.precio!,
      stock: data.stock!
    };
    const newProduct = new this.products(newItem);
    await newProduct.save();
    return newProduct;
  }

  async update(id: string, data: newProductObject): Promise<ProductObject> {
    const updateItem: any = data;
    updateItem.timestamp = moment().format('MM DD hh:mm:ss');
    return this.products.findByIdAndUpdate(id, updateItem).then(() => this.products.findById(id));
  }

  async delete(id: string) {
    await this.products.findByIdAndDelete(id);
  }

  async query(options: ProductQuery): Promise<ProductObject[]> {
    let query: ProductQuery = {};
    if (options.nombre) query.nombre = options.nombre;
    if (options.codigo) query.codigo = options.codigo;
    if (options.precio) query.precio = options.precio;
    if (options.stock) query.stock = options.stock;
    if (options.precioMax) query.precio = { $lte: Number(options.precioMax) } as unknown as number;
    if (options.precioMin) query.precio = { $gte: Number(options.precioMin) } as unknown as number;
    if (options.precioMin && options.precioMax)
      query.precio = { $gte: Number(options.precioMin), $lte: Number(options.precioMax) } as unknown as number;
    if (options.stockMax) query.stock = { $lte: Number(options.stockMax) } as unknown as number;
    if (options.stockMin) query.stock = { $gte: Number(options.stockMin) } as unknown as number;
    if (options.stockMin && options.stockMax)
      query.stock = { $gte: Number(options.stockMin), $lte: Number(options.stockMax) } as unknown as number;
    console.log(query);
    return this.products.find(query);
  }
}
