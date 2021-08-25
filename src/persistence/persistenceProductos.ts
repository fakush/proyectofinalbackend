import moment from 'moment';
import AuxFile from '../controllers/controllerFiles';

const productsFile = new AuxFile('productList.json');
let productos = JSON.parse(productsFile.read());

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

const getMaxid = () => {
  const max = productos.reduce((item: { id: number }, max: number) => (item.id > max ? item.id : max), 0);
  return Number(max.id) + 1;
};

class Persistence {
  find(id: number) {
    return productos.find((index: { id: number }) => index.id === Number(id));
  }

  get(id: number | null = null) {
    if (id) {
      return productos.filter((item: { id: number }) => item.id === id);
    }
    return productos;
  }

  add(data: newProduct) {
    const newItem: Product = {
      // Seteo algunos valores x default
      id: getMaxid(),
      timestamp: moment().format('MM DD hh:mm:ss'),
      nombre: data.nombre,
      descripcion: data.descripcion || 'Falta descripción',
      codigo: data.codigo || 'PXXXX',
      foto: data.foto || 'https://picsum.photos/200',
      precio: Number(data.precio),
      stock: Number(data.stock)
    };
    productos.push(newItem);
    productsFile.write(productos);
    return newItem;
  }

  update(id: number, data: newProduct) {
    const index = productos.findIndex((item: { id: any }) => Number(item.id) === id);
    productos[index].timestamp = moment().format('MMM DD hh:mm:ss');
    productos[index].nombre = data.nombre;
    // Chequeo si los valores cambiaron antes de asignarlos
    if (data.descripcion) productos[index].descripcion = data.descripcion;
    if (data.codigo) productos[index].codigo = data.codigo;
    if (data.foto) productos[index].foto = data.foto;
    productos[index].precio = Number(data.precio);
    productos[index].stock = Number(data.stock);
    productsFile.write(productos);
  }

  delete(id: number) {
    productos = productos.filter((item: { id: number }) => item.id !== Number(id));
    productsFile.write(productos);
    return productos;
  }
}

export const persistenceProductos = new Persistence();
