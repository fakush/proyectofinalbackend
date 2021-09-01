import { mySQLdbService } from '../services/db';
import moment from 'moment';

const tableName = 'productos';

interface newProduct {
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
    const item: any = await mySQLdbService.find(tableName, id);
    if (item.length == 0) return false;
    return true;
  }

  async get(id: number | null = null) {
    if (id) {
      const item = await mySQLdbService.get(tableName, id);
      return item;
    }
    const items = await mySQLdbService.get(tableName);
    return items;
  }

  async add(data: newProduct) {
    const newItemData: newProduct = {
      timestamp: moment().format('MM DD hh:mm:ss'),
      nombre: data.nombre,
      descripcion: data.descripcion || 'Falta descripción',
      codigo: data.codigo || 'PXXXX',
      foto: data.foto || 'https://picsum.photos/200',
      precio: Number(data.precio),
      stock: Number(data.stock)
    };
    const newItem = await mySQLdbService.create(tableName, newItemData);
    return mySQLdbService.get(tableName, Number(newItem));
  }

  async update(id: number, data: newProduct) {
    return await mySQLdbService.update(tableName, id, data);
  }

  async delete(id: number) {
    return await mySQLdbService.delete(tableName, id);
  }
}

export const productosDBService = new PersistenciaProductos();
