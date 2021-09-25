import { newCartObject, CartObject } from '../models/cart/cart.interfaces';
import { CartFactory, Persistencia } from '../models/cart/cart.factory';

const tipo = Persistencia.Memory;

class cartAPIClass {
  private cart;

  constructor() {
    this.cart = CartFactory.get(tipo);
  }

  async getItems(id: string | undefined = undefined): Promise<CartObject[]> {
    if (id) return await this.cart.get(id);
    else return await this.cart.get();
  }

  async addItems(itemData: newCartObject): Promise<CartObject> {
    const newProduct = await this.cart.add(itemData);
    return newProduct;
  }

  async deleteItem(id: string) {
    await this.cart!.delete(id);
  }
}

export const cartAPI = new cartAPIClass();
