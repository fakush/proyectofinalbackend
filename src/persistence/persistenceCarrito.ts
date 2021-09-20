// // todo: Migrar y Eliminar antes de entregar.

// import moment from 'moment';
// import AuxFile from '../controllers/controllerFiles';

// const productFile = new AuxFile('productList.json');
// const cartFile = new AuxFile('savedcart.json');
// let carrito = JSON.parse(cartFile.read());

// interface carritoObject {
//   id: number;
//   timestamp: any;
//   producto: object;
// }

// const getMaxid = () => {
//   const max = carrito.reduce((item: { id: number }, max: number) => (item.id > max ? item.id : max), 0);
//   return Number(max.id) + 1;
// };

// class Persistence {
//   find(id: number) {
//     return carrito.find((index: { id: number }) => index.id === Number(id));
//   }

//   findProduct(id: number) {
//     const poductList = JSON.parse(productFile.read());
//     return poductList.find((index: { id: number }) => index.id === Number(id));
//   }

//   get(id: number | null = null) {
//     if (id) {
//       return carrito.filter((item: { id: number }) => item.id === id);
//     }
//     return carrito;
//   }

//   add(id: number) {
//     const poductList = JSON.parse(productFile.read());
//     const producto = poductList.filter((item: { id: number }) => item.id === id);
//     const newItem: carritoObject = {
//       id: getMaxid(),
//       timestamp: moment().format('MMM DD hh:mm:ss'),
//       producto: producto
//     };
//     carrito.push(newItem);
//     cartFile.write(carrito);
//     return newItem;
//   }

//   delete(id: number) {
//     carrito = carrito.filter((item: { id: number }) => item.id !== Number(id));
//     cartFile.write(carrito);
//     return carrito;
//   }
// }

// export const persistenceCarrito = new Persistence();
