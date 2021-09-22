import { Request, Response } from 'express';
import { ProductosTestAPI } from '../apis/productsTestAPI';

class ProductoTest {
  getProducts(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const producto = ProductosTestAPI.getProducts(id);
      if (!producto) res.status(404).json({ msg: `Random product not found` });
      return res.json({ data: producto });
    }
    return res.json({ data: ProductosTestAPI.getProducts() });
  }

  makeProducts(req: Request, res: Response) {
    const cant = req.query.cant != undefined && req.query.cant != '' ? Number(req.query.cant) : 10;
    console.log(cant);

    for (let i = 0; i < cant; i++) {
      ProductosTestAPI.addProducts();
    }

    res.json({
      result: `Creando ${cant} productos`
    });
  }

  updateProducts(req: Request, res: Response) {
    const id = req.params.id;
    const recurso = ProductosTestAPI.getProducts(id);
    if (!recurso.length) return res.status(404).json({ msg: 'id not found' });
    const updatedItem = ProductosTestAPI.updateProducts(id, req.body);
    res.json({
      msg: 'actualizando productos',
      data: updatedItem
    });
  }

  deleteProducts(req: Request, res: Response) {
    const id = req.params.id;
    ProductosTestAPI.deleteProducts(id);
    return res.json({
      msg: 'borrando productos',
      data: ProductosTestAPI.getProducts()
    });
  }
}

export const controllerProductosTest = new ProductoTest();
