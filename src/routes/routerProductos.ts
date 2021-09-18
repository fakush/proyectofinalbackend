import { Router } from 'express';
import { controllerProductos } from '../controllers/controllerProductos';
import { isAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/', asyncHandler(controllerProductos.getProducts));

router.get('/:id', controllerProductos.checkValidId, asyncHandler(controllerProductos.getProducts));

router.post('/', isAdmin, controllerProductos.checkValidProduct, asyncHandler(controllerProductos.addProducts));

router.put(
  '/:id',
  isAdmin,
  controllerProductos.checkValidId,
  controllerProductos.checkValidProduct,
  asyncHandler(controllerProductos.updateProducts)
);

router.delete('/:id', isAdmin, controllerProductos.checkValidId, asyncHandler(controllerProductos.deleteProducts));

export default router;
