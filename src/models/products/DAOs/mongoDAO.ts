import mongoose from 'mongoose';
import Config from '../../../config';
import { newProductObject, ProductObject, ProductQuery, ProductBaseClass } from '../products.interfaces';

//MongoSchema
const productsSchema = new mongoose.Schema<ProductObject>({
  _id: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, default: 'Sin descripción' },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

// const productsSchema = new mongoose.Schema<ProductObject>({
//   _id: String,
//   timestamp: String,
//   nombre: String,
//   descripcion: String,
//   codigo: String,
//   foto: String,
//   precio: Number,
//   stock: Number
// });

const dbCollection = 'productos';

export class PersistenciaMongo implements ProductBaseClass {
  private server: string;
  private products;

  constructor(local: boolean = false) {
    local
      ? (this.server = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`)
      : (this.server = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
    mongoose.connect(this.server);
    this.products = mongoose.model<ProductObject>(dbCollection, productsSchema);
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
    const newProduct = new this.products(data);
    await newProduct.save();
    return newProduct;
  }

  async update(id: string, data: newProductObject) {
    return !this.products.findOneAndUpdate({ id: id }, { $set: data });
    // return this.products.findByIdAndUpdate(id, data);
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

    return this.products.find(query);
  }
}

// export const productosDBService = new PersistenciaMongo();
