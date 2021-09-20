// import { Request, Response, NextFunction } from 'express';
// import { persistenceCarrito } from '../persistence/persistenceCarrito';

// class Carrito {
//   getItems(req: Request, res: Response) {
//     const id = Number(req.params.id);
//     if (id) {
//       const item = persistenceCarrito.get(id);

//       if (!item)
//         res.status(404).json({
//           msg: `item not found`
//         });
//       return res.json({
//         data: item
//       });
//     }
//     return res.json({
//       data: persistenceCarrito.get()
//     });
//   }

//   checkValidId(req: Request, res: Response, next: NextFunction) {
//     const id = Number(req.params.id);
//     if (!id) {
//       return res.status(400).json({
//         msg: 'missing parameters'
//       });
//     }
//     const producto = persistenceCarrito.find(id);
//     if (!producto) {
//       return res.status(404).json({
//         msg: 'item not found'
//       });
//     }
//     next();
//   }

//   checkValidProduct(req: Request, res: Response, next: NextFunction) {
//     const id = Number(req.params.id_producto);
//     if (!id) {
//       return res.status(400).json({
//         msg: 'missing parameters'
//       });
//     }
//     const item = persistenceCarrito.findProduct(id);
//     if (!item) {
//       return res.status(404).json({
//         msg: 'product not found'
//       });
//     }
//     next();
//   }

//   addItem(req: Request, res: Response) {
//     const id = Number(req.params.id_producto);
//     const newItem = persistenceCarrito.add(id);

//     return res.json({
//       msg: 'añadiendo productos',
//       data: newItem
//     });
//   }

//   deleteItems(req: Request, res: Response) {
//     const id = Number(req.params.id);
//     persistenceCarrito.delete(id);
//     return res.json({
//       msg: 'borrando productos',
//       data: persistenceCarrito.get()
//     });
//   }
// }

// export const controllerCarrito = new Carrito();
