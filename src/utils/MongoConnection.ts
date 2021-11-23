import mongoose, { Connection } from 'mongoose';
import config from '../config';

mongoose.Promise = global.Promise;

const localURL = `mongodb://localhost:27017/${config.MONGO_LOCAL_DBNAME}`;
const atlasURL = `mongodb+srv://${config.MONGO_ATLAS_USER}:${config.MONGO_ATLAS_PASSWORD}@${config.MONGO_ATLAS_CLUSTER}/${config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;

export class MongoDB {
  private instance: number;
  private uri: string;
  private connection?: Connection;

  constructor(local?: boolean) {
    this.uri = local ? localURL : atlasURL;
    this.instance = 0;
  }

  getConnection() {
    if (!this.connection) this.connection = mongoose.createConnection(this.uri);
    return this.connection;
  }
}

export const mongoConnection = mongoose
  .connect(
    `mongodb+srv://${config.MONGO_ATLAS_USER}:${config.MONGO_ATLAS_PASSWORD}@${config.MONGO_ATLAS_CLUSTER}/${config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`
  )
  .then((m) => m.connection.getClient());
