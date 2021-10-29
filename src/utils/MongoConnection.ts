import mongoose from 'mongoose';
import config from '../config';

export const mongoConnection = mongoose
  .connect(
    `mongodb+srv://${config.MONGO_ATLAS_USER}:${config.MONGO_ATLAS_PASSWORD}@${config.MONGO_ATLAS_CLUSTER}/${config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`
  )
  .then((m) => m.connection.getClient());
