import { Request, Response, NextFunction } from 'express';
import { productsAPI } from '../apis/productos';
import { ProductQuery } from '../models/products/products.interfaces';
// import { persistenceProductos } from '../persistence/persistenceProductos';
// import { productosDBService } from '../persistence/persistenceDBProductos';

class Producto {
  checkValidProduct(req: Request, res: Response, next: NextFunction) {
    const { nombre, precio, stock } = req.body;
    //Note: Chequeo que los campos nombre, precio y stock existan y sean validos. (El resto pueden venir o no.)
    if (!nombre || !precio || !stock || typeof nombre !== 'string' || isNaN(precio) || isNaN(stock)) {
      return res.status(400).json({
        msg: 'error de ingreso'
      });
    }

    next();
  }

  async checkValidId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        msg: 'missing parameters'
      });
    }
    const producto = await productsAPI.getProducts(id);
    if (!producto) {
      return res.status(404).json({
        msg: 'product not found'
      });
    }
    next();
  }

  async getProducts(req: Request, res: Response) {
    const id = req.params.id;
    const { nombre, codigo, precio, stock } = req.query;
    if (id) {
      const producto = await productsAPI.getProducts(id);
      if (!producto) res.status(404).json({ msg: `product not found` });
      return res.json({ data: producto });
    }

    const query: ProductQuery = {};
    if (nombre) query.nombre = nombre.toString();
    if (codigo) query.codigo = codigo.toString();
    if (precio) query.precio = Number(precio);
    if (stock) query.stock = Number(stock);
    if (Object.keys(query).length) {
      return res.json({ data: await productsAPI.query(query) });
    }

    return res.json({ data: await productsAPI.getProducts() });
  }

  async addProducts(req: Request, res: Response) {
    const newItem = await productsAPI.addProduct(req.body);
    return res.json({ msg: 'creando productos', data: newItem });
  }

  async updateProducts(req: Request, res: Response) {
    const id = req.params.id;
    const updatedItem = await productsAPI.updateProduct(id, req.body);
    res.json({
      msg: 'actualizando productos',
      data: updatedItem
    });
  }

  async deleteProducts(req: Request, res: Response) {
    const id = req.params.id;
    await productsAPI.deleteProduct(id);
    return res.json({
      msg: 'borrando productos',
      data: await productsAPI.getProducts()
    });
  }
}

export const controllerProductos = new Producto();
