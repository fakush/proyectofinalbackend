import mongoose, { Schema } from 'mongoose';
import { OrderObject, OrderBaseClass } from '../orders.interfaces';
import { logger } from '../../../middleware/logger';

//MongoSchema
const orderSchema = new mongoose.Schema<OrderObject>({
  userId: { type: Schema.Types.ObjectId, required: true },
  products: [{ _id: Schema.Types.ObjectId, amount: Number }]
});

const dbCollection = 'orders';

export class PersistenciaMongo implements OrderBaseClass {
  private server: string;
  private orders;

  constructor(local: boolean = false) {
    // local
    //   ? (this.server = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`)
    //   : (this.server = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
    // mongoose.connect(this.server);
    this.orders = mongoose.model<OrderObject>(dbCollection, orderSchema);
  }

  async find(id: string): Promise<Boolean> {
    const item: any = await this.orders.findOne({ id });
    if (item == 0) return false;
    return true;
  }

  async getOrders(userId: string): Promise<OrderObject> {
    const item = await this.orders.findById({ userId });
    if (!item) throw new Error('No existe orden del usuario');
    return item;
  }

  async createOrder(userId: string, products: object[]): Promise<OrderObject> {
    const newOrder = new this.orders({ userId, products });
    await newOrder.save();
    return newOrder;
  }

  async deleteOrder(userId: string): Promise<OrderObject> {
    const item = await this.orders.findByIdAndDelete(userId);
    if (!item) throw new Error('No existe orden del usuario');
    return item;
  }
}
