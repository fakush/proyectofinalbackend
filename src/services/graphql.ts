import { buildSchema } from 'graphql';
import {
  getProducts,
  getProductsbyId,
  addProducts,
  updateProduct,
  deleteProduct
} from '../controllers/controllerProductosGraphql';

export const graphqlSchema = buildSchema(`
  type Query {
    getProducts: [Product]
    getProductsbyId(id: String!): [Product]
    deleteProduct(id: String!): String
  }
  type Mutation {
    addProducts(
      nombre: String!
      descripcion: String!
      codigo: String!
      precio: Float!
      foto: String!
      stock: Int!
    ): newProduct
    updateProduct(
      _id: String!
      nombre: String
      descripcion: String
      codigo: String
      precio: Float
      foto: String
      stock: Int
      timestamp: String
    ): Product
  }
  type newProduct {
    nombre: String
    descripcion: String
    codigo: String
    precio: Float
    foto: String
    stock: Int
  }
  type Product {
    _id: String
    nombre: String
    descripcion: String
    codigo: String
    precio: Float
    foto: String
    stock: Int
    timestamp: String
  }
`);

export const resolvers = {
  getProducts,
  getProductsbyId,
  addProducts,
  updateProduct,
  deleteProduct
};
