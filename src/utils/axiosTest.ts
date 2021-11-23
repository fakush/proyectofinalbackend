import axios from 'axios';
import { logger } from '../middleware/logger';

const urlBase = 'http://localhost:8080/api/productos/';
let axiosProductID = '';

export const axiosTest = async () => {
  try {
    // Primero verificamos si existe una sesión abierta haciendo una petición GET a la API
    const resp = await axios.get(`${urlBase}`);
    if (resp.data.data.length > 0) {
      logger.log.info('Axios Tests: Comenzamos las pruebas');
      await axiosTestPost();
      await axiosTestGetByID();
      await axiosTestPut();
      await axiosTestDelete();
    }
  } catch (err) {
    logger.log.error(err);
  }
};

const axiosTestPost = async () => {
  try {
    const resp = await axios.post(`${urlBase}`, {
      nombre: 'Test',
      descripcion: 'Este objeto fue creado para pruebas.',
      codigo: 'P0000',
      foto: 'https://picsum.photos/200',
      precio: 1000,
      stock: 1
    });
    logger.log.debug(`Axios Tests: 1 Producto Creado ==> ${JSON.stringify(resp.data)}`);
    axiosProductID = resp.data.data._id;
  } catch (err) {
    logger.log.error(err);
  }
  return axiosProductID;
};

const axiosTestGetByID = async () => {
  try {
    const resp = await axios.get(`${urlBase}/${axiosProductID}`);
    logger.log.debug(`Axios Tests: 2 Llamamos Por ID ==> ${JSON.stringify(resp.data)}`);
  } catch (err) {
    logger.log.error(err);
  }
};

const axiosTestPut = async () => {
  try {
    const resp = await axios.put(`${urlBase}/${axiosProductID}`, {
      descripcion: 'Este objeto fue modificado en las pruebas.',
      codigo: 'P0000',
      foto: 'https://picsum.photos/200',
      precio: 2000,
      stock: 2
    });
    logger.log.debug(`Axios Tests: 3 Producto Actualizado ==> ${JSON.stringify(resp.data)}`);
  } catch (err) {
    logger.log.error(err);
  }
};

const axiosTestDelete = async () => {
  try {
    const resp = await axios.delete(`${urlBase}/${axiosProductID}`);
    logger.log.debug(`Axios Tests: 4 Producto Borrado ==> ${JSON.stringify(resp.data)}`);
  } catch (err) {
    logger.log.error(err);
  }
};
