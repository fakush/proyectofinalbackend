import { Router } from 'express';
import { controllerCarrito } from '../controllers/controllerCarrito';

const router = Router();

router.get('/', controllerCarrito.getItems);

router.get('/:id', controllerCarrito.checkValidId, controllerCarrito.getItems);

router.post('/:id_producto?', controllerCarrito.checkValidProduct, controllerCarrito.addItem);

router.delete('/:id?', controllerCarrito.checkValidId, controllerCarrito.deleteItems);

export default router;
