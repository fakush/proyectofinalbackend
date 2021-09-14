import mongoose from 'mongoose';

const dbCollection = 'productos';

export interface ProductData {
  id: Number;
  timestamp: String;
  nombre: String;
  descripcion: String;
  codigo: String;
  foto: String;
  precio: Number;
  stock: Number;
}

const productsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  timestamp: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, default: 'Sin descripción' },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

export default mongoose.model(dbCollection, productsSchema);