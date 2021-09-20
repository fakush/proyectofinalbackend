import { Request, Response, NextFunction } from 'express';
import { productsAPI } from '../apis/productsAPI';
import { ProductQuery } from '../models/products/products.interfaces';
class Producto {
  checkValidProduct(req: Request, res: Response, next: NextFunction) {
    const { nombre, precio, stock } = req.body;
    //Note: Chequeo que los campos nombre, precio y stock existan y sean validos. (El resto pueden venir o no.)
    if (!nombre || !precio || !stock) {
      return res.status(400).json({
        msg: 'Falta ingresar alguno de los campos obligatorios: Nombre, Precio y Stock'
      });
    }
    next();
  }

  // Reviso que cada campo sea del tipo que debería ser
  checkValidTypes(req: Request, res: Response, next: NextFunction) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre && !descripcion && !codigo && !foto && !precio && !stock) {
      return res.status(400).json({
        msg: 'Al menos se debe ingresar un campo a modificar'
      });
    }
    if (
      (nombre && typeof nombre !== 'string') ||
      (descripcion && typeof descripcion !== 'string') ||
      (codigo && typeof codigo !== 'string') ||
      (foto && typeof foto !== 'string') ||
      (precio && isNaN(precio)) ||
      (stock && isNaN(stock))
    ) {
      return res.status(400).json({
        msg: 'El tipo de dato para alguno de los campos es incorrecto'
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
    if (producto.length < 1) {
      return res.status(404).json({
        msg: 'product not found'
      });
    }
    next();
  }

  async getProducts(req: Request, res: Response) {
    const id = req.params.id;
    const { nombre, codigo, precio, precioMin, precioMax, stock, stockMin, stockMax } = req.query;
    if (id) {
      const producto = await productsAPI.getProducts(id);
      if (!producto) res.status(404).json({ msg: `product not found` });
      return res.json({ data: producto });
    }

    const query: ProductQuery = {};
    if (nombre) query.nombre = nombre.toString();
    if (codigo) query.codigo = codigo.toString();
    if (precio) query.precio = Number(precio);
    if (precioMin) query.precioMin = precioMin.toString();
    if (precioMax) query.precioMax = precioMax.toString();
    if (stock) query.stock = Number(stock);
    if (stockMin) query.stockMin = stockMin.toString();
    if (stockMax) query.stockMax = stockMax.toString();
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
