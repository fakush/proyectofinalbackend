// import fs from 'fs';
// import { newCartObject, CartObject, CartBaseClass } from '../cart.interfaces';
// import moment from 'moment';
// import { v4 as uuidv4 } from 'uuid';

// export class PersistenciaFS implements CartBaseClass {
//   private carrito: CartObject[] = [];
//   private fileName: string;

//   constructor(file: string) {
//     const mockData = [
//       {
//         _id: '1',
//         timestamp: 'Apr 4 05:06:07',
//         producto: {
//           id: 0,
//           timestamp: 'Apr 4 05:06:07',
//           nombre: 'Porsche',
//           descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
//           codigo: 'P0001',
//           foto: 'https://picsum.photos/200',
//           precio: 480,
//           stock: 17
//         }
//       },
//       {
//         _id: '2',
//         timestamp: 'Apr 6 05:06:08',
//         producto: {
//           id: 4,
//           timestamp: 'Apr 5 05:06:08',
//           nombre: 'Colgate',
//           descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
//           codigo: 'P0001',
//           foto: 'https://picsum.photos/200',
//           precio: 613,
//           stock: 25
//         }
//       },
//       {
//         _id: '3',
//         timestamp: 'Apr 6 05:06:08',
//         producto: {
//           id: 4,
//           timestamp: 'Apr 5 05:06:08',
//           nombre: 'Colgate',
//           descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
//           codigo: 'P0001',
//           foto: 'https://picsum.photos/200',
//           precio: 613,
//           stock: 25
//         }
//       }
//     ];
//     this.fileName = file;
//     this.carrito = mockData;
//     this.guardar();
//   }

//   async leer(archivo: string): Promise<void> {
//     this.carrito = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
//   }

//   async guardar(): Promise<void> {
//     await fs.promises.writeFile(this.fileName, JSON.stringify(this.carrito, null, '\t'));
//   }

//   async findIndex(id: string): Promise<number> {
//     await this.leer(this.fileName);
//     return this.carrito.findIndex((aProduct: CartObject) => aProduct._id == id);
//   }

//   async find(id: string): Promise<CartObject | undefined> {
//     await this.leer(this.fileName);
//     return this.carrito.find((aProduct) => aProduct._id === id);
//   }

//   async get(id?: string): Promise<CartObject[]> {
//     if (id) {
//       return this.carrito.filter((aProduct) => aProduct._id === id);
//     }
//     return this.carrito;
//   }

//   async add(idProducto: newCartObject): Promise<CartObject> {
//     await this.leer(this.fileName);
//     const newItem: CartObject = {
//       _id: uuidv4(),
//       timestamp: moment().format('MM DD hh:mm:ss'),
//       producto: idProducto
//     };
//     this.carrito.push(newItem);
//     await this.guardar();
//     return newItem;
//   }

//   async delete(id: string): Promise<void> {
//     await this.leer(this.fileName)
//       .then(() => this.findIndex(id))
//       .then((index) => {
//         this.carrito.splice(Number(index), 1);
//         this.guardar();
//       });
//   }
// }
