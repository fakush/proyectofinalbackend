import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoDB } from '../utils/MongoConnection';
import { ProductObject } from '../models/products/products.interfaces';
import { Products } from '../models/products/DAOs/mongoDAO';
import ExpressServer from '../services/server';
import { expect } from 'chai';

describe('Ejemplos de tests', () => {
  let newMongo: any;
  let request: any;

  beforeAll(() => {
    jest.spyOn(mongoose, 'createConnection').mockImplementationOnce(() => 'Connected');
    newMongo = new MongoDB();
    request = supertest(ExpressServer);
  });

  afterAll(async (done) => {
    // await mongoose.disconnect();
    done();
  });

  test('Debería devolver conexión a mongo falsa', async () => {
    const connection = newMongo.getConnection();
    expect(connection).to.equal('Connected');
  });

  test('Deberia recibir un array vacio si no existen productos', async () => {
    const mockData: ProductObject[] = [];

    jest.spyOn(Products, 'find').mockImplementationOnce(() => Promise.resolve(mockData) as any);

    const expectedResponse = {
      data: mockData
    };
    const response = await request.get('/api/productos');
    expect(response.body).to.deep.equal(expectedResponse);
  });

  test('Deberia recibir un array con un producto si mongoose me devuele un producto', async () => {
    const mockData: ProductObject[] = [
      {
        _id: '614dfd26ea29ad3f194bad7c',
        timestamp: 'Apr 5 05:06:08',
        nombre: 'BMW',
        descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 2751,
        stock: 8
      }
    ];
    jest.spyOn(Products, 'find').mockImplementationOnce(() => Promise.resolve(mockData) as any);

    const expectedResponse = {
      data: mockData
    };
    const response = await request.get('/api/productos');
    expect(response.body).to.deep.equal(expectedResponse);
  });

  test('deberia crear un producto correctamente', async () => {
    jest.spyOn(Products.prototype, 'save').mockResolvedValueOnce('ok');
    const body = {
      timestamp: '22 de Abril',
      nombre: 'ASUS',
      descripcion: 'Computadora Asus.',
      codigo: 'P2000',
      foto: 'https://picsum.photos/200',
      precio: 2000,
      stock: 2
    };
    const response = await request.post('/api/productos').send(body);

    expect(response.status).to.eql(200);

    const product = response.body.data;
    expect(product).to.include.keys('timestamp', 'nombre', 'descripcion', 'codigo', 'foto', 'precio', 'stock');

    expect(product.nombre).to.equal(body.nombre);
    expect(product.descripcion).to.equal(body.descripcion);
    expect(product.codigo).to.equal(body.codigo);
    expect(product.foto).to.equal(body.foto);
    expect(product.precio).to.equal(body.precio);
    expect(product.stock).to.equal(body.stock);
  });

  test('deberia recibir un error 400 al querer crear un usuario y mandar mal el body', async () => {
    const body = {};
    const response = await request.post('/api/productos').send(body);
    expect(response.status).to.eql(400);

    const expectedBody = {
      msg: 'Falta ingresar alguno de los campos obligatorios: Nombre, Precio y Stock'
    };

    expect(response.body).to.deep.equal(expectedBody);
  });
});
