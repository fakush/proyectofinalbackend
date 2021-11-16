import { buildSchema } from 'graphql';
import { getProducts, getProductsbyId, addProducts } from '../controllers/controllerProductosGraphql';

export const graphqlSchema = buildSchema(`
    type Query {
        getProducts: [Product],
        getProductsbyId(id: String!): [Product]
    },
    type Mutation {
        addProducts(nombre: String!, descripcion: String!, codigo: String!, precio: Float!, foto: String!, stock: String!): newProduct
    },
    type newProduct {
        nombre: String
        descripcion: String
        codigo: String
        precio: Float
        foto: String
        stock: Int
    },
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
  addProducts
};
