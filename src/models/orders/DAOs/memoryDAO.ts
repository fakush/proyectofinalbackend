import { OrderObject } from '../orders.interfaces';
import OrderDto from '../order.dto';

const mockData = [
  {
    _id: '618d7c572e6b50872bacaac6',
    userId: '618d72256fc267b7222e8bce',
    products: [
      {
        _id: '614dfd26ea29ad3f194bad7c',
        amount: 5
      },
      {
        _id: '614dfd26ea29ad3f194bad7e',
        amount: 2
      }
    ],
    timestamp: '16 de Abril de 1974'
  },
  {
    _id: '618d7c572e6b50872bacaac7',
    userId: '618d8bd4b6e3c4735e84be82',
    products: [
      {
        _id: '614dfd26ea29ad3f194bad7c',
        amount: 5
      },
      {
        _id: '614dfd26ea29ad3f194bad7e',
        amount: 2
      }
    ],
    timestamp: '16 de Abril de 1974'
  },
  {
    _id: '618d7c572e6b50872bacaac8',
    userId: '618d72256fc267b7222e8bce',
    products: [
      {
        _id: '614dfd26ea29ad3f194bad7c',
        amount: 5
      },
      {
        _id: '614dfd26ea29ad3f194bad7e',
        amount: 2
      }
    ],
    timestamp: '16 de Abril de 1974'
  }
];

export class PersistenciaMemoria {
  private orders: OrderObject[] = [];

  constructor() {
    mockData.forEach((item) => this.orders.push(item));
  }

  findIndex(id: string) {
    return this.orders.findIndex((aProduct) => aProduct.userId == id);
  }

  async getOrders(userId?: string): Promise<OrderDto[]> {
    const orderList = this.orders;
    return orderList.map((order) => new OrderDto(order));
  }

  async createOrder(userId: string, products: object[]): Promise<OrderDto> {
    const order = {
      _id: '',
      userId: userId,
      products: products,
      timestamp: ''
    };
    return new OrderDto(order);
  }
  async deleteOrder(userId: string): Promise<OrderDto> {
    const index = this.findIndex(userId);
    this.orders.splice(index, 1);
    return this.orders as unknown as OrderDto;
  }
}
