import mongoose, { Schema } from 'mongoose';
import { CartObject, CartBaseClass, ProductObject } from '../cart.interfaces';
import { logger } from '../../../middleware/logger';

//MongoSchema
const cartSchema = new mongoose.Schema<CartObject>({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  products: [{ _id: Schema.Types.ObjectId, amount: Number }]
});

const dbCollection = 'carrito';
export class PersistenciaMongo implements CartBaseClass {
  private server: string;
  private carrito;

  constructor(local: boolean = false) {
    // local
    //   ? (this.server = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`)
    //   : (this.server = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
    // mongoose.connect(this.server);
    this.carrito = mongoose.model<CartObject>(dbCollection, cartSchema);
  }

  async find(id: string): Promise<Boolean> {
    const item: any = await this.carrito.findById(id);
    if (item == 0) return false;
    return true;
  }

  async getCart(userId: string): Promise<CartObject> {
    const item = await this.carrito.findOne({ userId });
    if (!item) throw new Error('No existe el carrito');
    return item;
  }

  async createCart(userId: string): Promise<CartObject> {
    const newCart = new this.carrito({ userId, products: [] });
    await newCart.save();
    return newCart;
  }

  productExist(cart: CartObject, productId: string): boolean {
    const index = cart.products.findIndex((aProduct) => aProduct._id == productId);
    if (index < 0) return false;
    return true;
  }

  async add2Cart(cartId: string, product: ProductObject): Promise<CartObject> {
    const cart = await this.carrito.findById(cartId);
    if (!cart) throw new Error('Cart not found');
    const index = cart.products.findIndex((aProduct: any) => aProduct._id == product._id);
    if (index < 0) cart.products.push(product);
    else cart.products[index].amount += product.amount;
    await cart.save();
    return cart;
  }

  async deleteProduct(cartId: string, product: ProductObject): Promise<CartObject> {
    const cart = await this.carrito.findById(cartId);
    if (!cart) throw new Error('Cart not found');
    const index = cart.products.findIndex((aProduct) => aProduct._id == product._id);
    if (index < 0) throw new Error('Product not found');
    if (cart.products[index].amount <= product.amount) cart.products.splice(index, 1);
    else cart.products[index].amount -= product.amount;
    await cart.save();
    return cart;
  }
}
