import { Router } from 'express';
import { controllerCarrito } from '../controllers/controllerCarrito';

const router = Router();

router.get('/:id', controllerCarrito.lookForId, controllerCarrito.getCart);

router.post('/:id', controllerCarrito.lookForId, controllerCarrito.add2Cart);

router.delete('/:id', controllerCarrito.lookForId, controllerCarrito.deleteProducts);

export default router;
