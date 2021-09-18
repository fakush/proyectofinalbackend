import { newProductObject, ProductObject, ProductBaseClass, ProductQuery } from '../products.interfaces';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export class PersistenciaMemoria implements ProductBaseClass {
  private productos: ProductObject[] = [];

  constructor() {
    const mockData = [
      {
        _id: '1',
        timestamp: 'Apr 5 05:06:08',
        nombre: 'BMW',
        descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 2751,
        stock: 8
      },
      {
        _id: '2',
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Kleenex',
        descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 1898,
        stock: 12
      },
      {
        _id: '3',
        timestamp: 'Apr 4 05:06:07',
        nombre: 'Johnson & Johnson',
        descripcion: 'Esta primavera en mi cabaña, Absolutamente nada, Absolutamente todo',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 570,
        stock: 7
      },
      {
        _id: '4',
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Colgate',
        descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
        codigo: 'P0001',
        foto: 'https://picsum.photos/200',
        precio: 3613,
        stock: 25
      },
      {
        _id: '5',
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Pampers',
        descripcion: 'Anoche cubrí, mis hijos dormidos, y el ruido del mar.',
        codigo: 'P0003',
        foto: 'https://picsum.photos/200',
        precio: 856,
        stock: 21
      },
      {
        _id: '6',
        timestamp: 'Apr 4 05:06:09',
        nombre: 'Nike',
        descripcion: 'Mil pequeños peces blancos, Como si hirviera, El color del agua',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 4796,
        stock: 12
      },
      {
        _id: '7',
        timestamp: 'Apr 4 05:06:09',
        nombre: 'Disney',
        descripcion: 'Pareciera que el sapo, Va a expeler, una nube',
        codigo: 'P0004',
        foto: 'https://picsum.photos/200',
        precio: 1201,
        stock: 16
      },
      {
        _id: '8',
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Pampers',
        descripcion: 'Mi cuenco de mendigar, Acepta hojas caídas',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 514,
        stock: 1
      },
      {
        id: '9',
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Audi',
        descripcion: 'Bajo la lluvia de verano, El sendero, Desapareció',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 2457,
        stock: 15
      }
    ];

    mockData.forEach((item) => this.productos.push(item));
  }

  findIndex(id: string) {
    return this.productos.findIndex((aProduct) => aProduct._id == id);
  }

  find(id: string): ProductObject | undefined {
    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductObject[]> {
    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(data: newProductObject): Promise<ProductObject> {
    const newItem: ProductObject = {
      _id: uuidv4(),
      timestamp: moment().format('MM DD hh:mm:ss'),
      nombre: data.nombre!,
      descripcion: data.descripcion || 'Sin descripción',
      codigo: data.codigo || 'P0000',
      foto: data.foto || 'https://picsum.photos/200',
      precio: data.precio!,
      stock: data.stock || 0
    };
    this.productos.push(newItem);
    return newItem;
  }

  async update(id: string, newProductData: newProductObject): Promise<ProductObject> {
    const index = this.findIndex(id);
    const oldProduct = this.productos[index];
    oldProduct.timestamp = moment().format('MM DD hh:mm:ss');
    if (newProductData.nombre?.length) oldProduct.nombre = newProductData.nombre;
    if (newProductData.descripcion?.length) oldProduct.descripcion = newProductData.descripcion;
    if (newProductData.codigo?.length) oldProduct.codigo = newProductData.codigo;
    if (newProductData.foto?.length) oldProduct.foto = newProductData.foto;
    if (newProductData.precio) oldProduct.precio = newProductData.precio;
    if (newProductData.stock) oldProduct.stock = newProductData.stock;

    const updatedProduct: ProductObject = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const index = this.findIndex(id);
    this.productos.splice(index, 1);
  }

  async query(options: ProductQuery): Promise<ProductObject[]> {
    type Conditions = (aProduct: ProductObject) => boolean;
    const query: Conditions[] = [];
    if (options.nombre) query.push((aProduct: ProductObject) => aProduct.nombre == options.nombre);
    if (options.codigo) query.push((aProduct: ProductObject) => aProduct.codigo == options.codigo);
    if (options.precio) query.push((aProduct: ProductObject) => aProduct.precio == options.precio);
    if (options.stock) query.push((aProduct: ProductObject) => aProduct.stock == options.stock);
    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
