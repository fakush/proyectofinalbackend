import { CartObject } from '../models/cart/cart.interfaces';
import { CartFactory, Persistencia } from '../models/cart/cart.factory';
import { authAPI } from './UserAuthAPI';
// import { productsAPI } from './productsAPI';
import { logger } from '../middleware/logger';

const tipo = Persistencia.MongoAtlas;

class cartAPIClass {
  private cart;

  constructor() {
    this.cart = CartFactory.get(tipo);
  }

  async getCart(userId: string): Promise<CartObject> {
    return await this.cart.getCart(userId);
  }

  async createCart(userId: string): Promise<CartObject> {
    const user = await authAPI.findUser(userId);
    logger.log.debug(`Creating cart for user ${user}`);
    if (!user) throw new Error('User does not exist. Error creating cart');
    const newCart = await this.cart.createCart(userId);
    return newCart;
  }

  async add2Cart(cartId: string, productId: string, amount: number): Promise<CartObject> {
    // const product = (await productsAPI.getProducts(productId))[0];
    const newProduct = { _id: productId, amount: amount };
    const updatedCart = await this.cart.add2Cart(cartId, newProduct);
    return updatedCart;
  }

  async deleteProduct(cartId: string, productId: string, amount: number) {
    // const product = (await productsAPI.getProducts(productId))[0];
    const oldProduct = { _id: productId, amount: amount };
    const updatedCart = await this.cart.deleteProduct(cartId, oldProduct);
    return updatedCart;
  }
}

export const cartAPI = new cartAPIClass();
