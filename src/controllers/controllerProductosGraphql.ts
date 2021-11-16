import { productsAPI } from '../apis/productsAPI';

export const getProducts = async () => {
  const products = await productsAPI.getProducts();
  if (!products) {
    throw new Error('No products found');
  } else {
    return products;
  }
};

export const getProductsbyId = async (parameters: any) => {
  const products = await productsAPI.getProducts(parameters.id);
  if (!products) {
    throw new Error('Product not found');
  } else {
    return products;
  }
};

const validateProduct = (product: any) => {
  if (
    !product.nombre &&
    !product.descripcion &&
    !product.codigo &&
    !product.foto &&
    !product.precio &&
    !product.stock
  ) {
    return false;
  }
  if (
    (product.nombre && typeof product.nombre !== 'string') ||
    (product.descripcion && typeof product.descripcion !== 'string') ||
    (product.codigo && typeof product.codigo !== 'string') ||
    (product.foto && typeof product.foto !== 'string') ||
    (product.precio && isNaN(product.precio)) ||
    (product.stock && isNaN(product.stock))
  ) {
    return false;
  } else {
    return true;
  }
};

export const addProducts = async (parameters: any) => {
  if (validateProduct(parameters)) {
    return await productsAPI.addProduct(parameters);
  } else throw new Error('Invalid product');
};
