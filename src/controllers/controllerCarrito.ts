import { Request, Response, NextFunction } from 'express';
import { cartAPI } from '../apis/cartAPI';
import { productsAPI } from '../apis/productsAPI';
import { logger } from '../middleware/logger';
import { CartObject } from '../models/cart/cart.interfaces';

class Carrito {
  async lookForId(req: Request, res: Response, next: NextFunction) {
    // Si el id no existe, se manda un error 404
    const id = req.params.id;
    if (!id) return res.status(400).json({ msg: 'missing parameters' });
    next();
  }

  async getCart(req: Request, res: Response) {
    const userId = req.params.id;
    const cart = await cartAPI.getCart(userId);
    if (!cart) res.status(404).json({ msg: `cart not found` });
    return res.json({ data: cart });
  }

  async add2Cart(req: Request, res: Response) {
    const cartId = req.params.id;
    logger.log.info(`Adding product to cart ${cartId}`);
    const { product, amount } = req.body;
    logger.log.info(`Product: ${product}`);
    logger.log.info(`Amount: ${amount}`);
    const updatedCart = await cartAPI.add2Cart(cartId, product, amount);
    return res.json(updatedCart);
  }

  async deleteProducts(req: Request, res: Response) {
    const cartId = req.params.id;
    const { product, amount } = req.body;
    const updatedCart = await cartAPI.deleteProduct(cartId, product, amount);
    return res.json(updatedCart);
  }
}

export const controllerCarrito = new Carrito();
