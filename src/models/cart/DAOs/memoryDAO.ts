import { newCartObject, CartObject, CartBaseClass } from '../cart.iterfaces';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export class PersistenciaMemoria implements CartBaseClass {
  private carrito: CartObject[] = [];
  constructor() {
    const mockData = [
      {
        _id: '1',
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
        _id: '2',
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
        _id: '3',
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

    mockData.forEach((item) => this.carrito.push(item));
  }

  findIndex(id: string) {
    return this.carrito.findIndex((aProduct) => aProduct._id == id);
  }

  find(id: string): CartObject | undefined {
    return this.carrito.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<CartObject[]> {
    if (id) {
      return this.carrito.filter((aProduct) => aProduct._id === id);
    }
    return this.carrito;
  }

  async add(idProducto: newCartObject): Promise<CartObject> {
    const newItem: CartObject = {
      _id: uuidv4(),
      timestamp: moment().format('MM DD hh:mm:ss'),
      producto: idProducto
    };
    this.carrito.push(newItem);
    return newItem;
  }

  async delete(id: string): Promise<void> {
    const index = this.findIndex(id);
    this.carrito.splice(index, 1);
  }
}
