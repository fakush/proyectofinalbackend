import { OrderObject, userReference } from './orders.interfaces';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

export default class OrderDto {
  _id?: string;
  userId: userReference;
  products: object[];
  timestamp?: string;

  constructor(data: any) {
    this._id = uuid();
    this.userId = data.userId;
    this.products = data.products;
    this.timestamp = moment().format();
  }
}
