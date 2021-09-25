import { Request, Response, NextFunction } from 'express';
import { cartAPI } from '../apis/cartAPI';
import { productsAPI } from '../apis/productsAPI';
import { newCartObject } from '../models/cart/cart.interfaces';

class Carrito {
  async checkValidId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    // Esto verifica que haya un parametro
    if (!id) {
      return res.status(400).json({
        msg: 'missing parameters'
      });
    }
    // Esto verifica que el parametro sea valido
    const item = await cartAPI.getItems(id);
    if (item.length < 1) {
      return res.status(404).json({
        msg: 'item not found'
      });
    }
    // Si pasa los dos chequeos sigue.
    next();
  }

  async checkValidProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id_producto;
    if (!id) {
      return res.status(400).json({
        msg: 'missing parameters'
      });
    }
    const item = await productsAPI.getProducts(id);
    if (item.length < 1) {
      return res.status(404).json({
        msg: 'product not found'
      });
    }
    next();
  }

  async getItems(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const item = await cartAPI.getItems(id);
      if (!item)
        res.status(404).json({
          msg: `item not found`
        });
      return res.json({
        data: item
      });
    }
    return res.json({
      data: await cartAPI.getItems()
    });
  }

  async addItem(req: Request, res: Response) {
    const id = req.params.id_producto;
    const item = await productsAPI.getProducts(id);
    const newItem = await cartAPI.addItems(item as unknown as newCartObject);

    return res.json({
      msg: 'añadiendo productos',
      data: newItem
    });
  }

  async deleteItems(req: Request, res: Response) {
    const id = req.params.id;
    await cartAPI.deleteItem(id);
    return res.json({
      msg: 'borrando productos',
      data: await cartAPI.getItems()
    });
  }
}

export const controllerCarrito = new Carrito();
