import { Router } from 'express';
import { controllerCarrito } from '../controllers/controllerCarrito';

const router = Router();

router.get('/listar', controllerCarrito.getItems);

router.get('/listar/:id', controllerCarrito.checkValidId, controllerCarrito.getItems);

router.post('/agregar/:id_producto', controllerCarrito.checkValidProduct, controllerCarrito.addItem);

router.delete('/borrar/:id', controllerCarrito.checkValidId, controllerCarrito.deleteItems);

export default router;
