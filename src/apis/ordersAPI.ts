import { OrderObject } from '../models/orders/orders.interfaces';
import { OrderFactory, Persistencia } from '../models/orders/orders.factory';
import { authAPI } from './UserAuthAPI';
import { logger } from '../middleware/logger';

const tipo = Persistencia.MongoAtlas;

class cartAPIClass {
  private order;

  constructor() {
    this.order = OrderFactory.get(tipo);
  }

  async findOrder(orderId: string) {
    return await this.order.find(orderId);
  }

  async getOrders(userId: string): Promise<OrderObject> {
    return await this.order.getOrders(userId);
  }

  async createOrder(userId: string, products: object[]): Promise<OrderObject> {
    const user = await authAPI.findUser(userId);
    logger.log.debug(`Creating order for user ${user}`);
    if (!user) throw new Error('User does not exist. Error creating order');
    const newOrder = await this.order.createOrder(userId, products);
    return newOrder;
  }

  async deleteProduct(orderId: string) {
    return await this.order.deleteOrder(orderId);
  }
}

export const cartAPI = new cartAPIClass();
