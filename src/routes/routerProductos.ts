import { Router } from 'express';
import { controllerProductos } from '../controllers/controllerProductos';
import { isAdmin } from '../middleware/admin';

const router = Router();

router.get('/listar', controllerProductos.getProducts);

router.get('/listar/:id', controllerProductos.checkValidId, controllerProductos.getProducts);

router.post('/agregar', isAdmin, controllerProductos.checkValidProduct, controllerProductos.addProducts);

router.put(
  '/actualizar/:id',
  isAdmin,
  controllerProductos.checkValidId,
  controllerProductos.checkValidProduct,
  controllerProductos.updateProducts
);

router.delete('/borrar/:id', isAdmin, controllerProductos.checkValidId, controllerProductos.deleteProducts);

export default router;
