import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';
import mongoose from 'mongoose';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly model: any;

  constructor(db: string, schema: mongoose.Schema) {
    this.model = mongoose.model(db, schema);
  }

  async getAll(item?: T): Promise<T[]> {
    if (item) {
      return await this.model.findOne({ item });
    }
    return await this.model.find();
  }

  async add(item: T): Promise<boolean> {
    const newItem = new this.model(item);
    const result: mongoose.Document = await newItem.save();
    return !!result;
  }

  async update(id: string, item: T): Promise<boolean> {
    const result: mongoose.Document = await this.model.findByIdAndUpdate(id, item);
    return !!result;
  }

  async delete(id: string): Promise<boolean> {
    const result: mongoose.Document = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}
