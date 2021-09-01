import { Request, Response, NextFunction } from 'express';
// import { persistenceProductos } from '../persistence/persistenceProductos';
import { productosDBService } from '../persistence/persistenceDBProductos';

class Producto {
  async getProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (id) {
      const producto = await productosDBService.get(id);

      if (!producto)
        res.status(404).json({
          msg: `product not found`
        });
      return res.json({
        data: producto
      });
    }
    return res.json({
      data: await productosDBService.get()
    });
  }

  checkValidProduct(req: Request, res: Response, next: NextFunction) {
    const { nombre, precio, stock } = req.body;
    // Chequeo que los campos nombre, precio y stock existan y sean validos. (El resto pueden venir o no.)
    if (!nombre || !precio || !stock || typeof nombre !== 'string' || isNaN(precio) || isNaN(stock)) {
      return res.status(400).json({
        msg: 'error de ingreso'
      });
    }
    next();
  }

  async checkValidId(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({
        msg: 'missing parameters'
      });
    }
    const producto = await productosDBService.find(id);
    if (!producto) {
      return res.status(404).json({
        msg: 'product not found'
      });
    }
    next();
  }

  async addProducts(req: Request, res: Response) {
    const newItem = await productosDBService.add(req.body);

    return res.json({
      msg: 'creando productos',
      data: newItem
    });
  }

  async updateProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    await productosDBService.update(id, req.body);
    res.json({
      msg: 'actualizando productos',
      data: await productosDBService.get(id)
    });
  }

  async deleteProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    await productosDBService.delete(id);
    return res.json({
      msg: 'borrando productos',
      data: await productosDBService.get()
    });
  }
}

export const controllerProductos = new Producto();
