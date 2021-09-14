import { mongoDBService } from '../services/mongo_db';
import moment from 'moment';

interface newProduct {
  id: Number;
  timestamp: any;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

interface Product {
  id: number;
  timestamp: any;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

class PersistenciaProductos {
  async find(id: number) {
    const item: any = await mongoDBService.find(id);
    if (item == 0) return false;
    return true;
  }

  async findGreatest() {
    const item: any = await mongoDBService.findGreatest();
    return item.id + 1;
  }

  async get(id: number | null = null) {
    if (id) {
      const item = await mongoDBService.get(id);
      return item;
    }
    const items = await mongoDBService.get();
    return items;
  }

  async add(data: newProduct) {
    const newItemData: newProduct = {
      id: 0,
      timestamp: moment().format('MM DD hh:mm:ss'),
      nombre: data.nombre,
      descripcion: data.descripcion || 'Falta descripción',
      codigo: data.codigo || 'PXXXX',
      foto: data.foto || 'https://picsum.photos/200',
      precio: Number(data.precio),
      stock: Number(data.stock)
    };
    const cretateItem = () => {
      const proceso = this.findGreatest()
        .then((result: Number) => (newItemData.id = result))
        .then(() => mongoDBService.create(newItemData))
        .then(() => mongoDBService.get(Number(newItemData.id)));
      return proceso;
    };
    return await cretateItem();
  }

  async update(id: number, data: newProduct) {
    return await mongoDBService.update(id, data);
  }

  async delete(id: number) {
    return await mongoDBService.delete(id);
  }
}

export const productosDBService = new PersistenciaProductos();
