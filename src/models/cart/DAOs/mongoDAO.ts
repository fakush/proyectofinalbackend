import mongoose from 'mongoose';
import Config from '../../../config';
import { newCartObject, CartObject, CartBaseClass } from '../cart.iterfaces';
import moment from 'moment';

//MongoSchema
const cartSchema = new mongoose.Schema<CartObject>({
  timestamp: { type: String, required: true },
  producto: { type: Object, required: true }
});

const dbCollection = 'carrito';

const mockData = [
  {
    timestamp: 'Apr 4 05:06:07',
    producto: {
      id: 0,
      timestamp: 'Apr 4 05:06:07',
      nombre: 'Porsche',
      descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
      codigo: 'P0001',
      foto: 'https://picsum.photos/200',
      precio: 480,
      stock: 17
    }
  },
  {
    timestamp: 'Apr 6 05:06:08',
    producto: {
      id: 4,
      timestamp: 'Apr 5 05:06:08',
      nombre: 'Colgate',
      descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
      codigo: 'P0001',
      foto: 'https://picsum.photos/200',
      precio: 613,
      stock: 25
    }
  },
  {
    timestamp: 'Apr 6 05:06:08',
    producto: {
      id: 4,
      timestamp: 'Apr 5 05:06:08',
      nombre: 'Colgate',
      descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
      codigo: 'P0001',
      foto: 'https://picsum.photos/200',
      precio: 613,
      stock: 25
    }
  }
];

export class PersistenciaMongo implements CartBaseClass {
  private server: string;
  private carrito;

  constructor(local: boolean = false) {
    local
      ? (this.server = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`)
      : (this.server = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
    mongoose.connect(this.server);
    this.carrito = mongoose.model<CartObject>(dbCollection, cartSchema);
    this.carrito.count().then((count) => {
      if (count < 1) {
        console.log('Insertando Data Mockup');
        this.carrito.insertMany(mockData);
      }
    });
  }

  async find(id: string): Promise<Boolean> {
    const item: any = await this.carrito.findById(id);
    if (item == 0) return false;
    return true;
  }

  async get(id?: string): Promise<CartObject[]> {
    let output: CartObject[] = [];
    try {
      if (id) {
        const item = await this.carrito.findById(id);
        if (item) output.push(item);
      } else output = await this.carrito.find();
      return output;
    } catch (err) {
      return output;
    }
  }

  async add(idProducto: newCartObject): Promise<CartObject> {
    const newCartItem: CartObject = {
      timestamp: moment().format('MM DD hh:mm:ss'),
      producto: idProducto
    };
    const newItem = new this.carrito(newCartItem);
    await newItem.save();
    return newItem;
  }

  async delete(id: string): Promise<void> {
    await this.carrito.findByIdAndDelete(id);
  }
}
