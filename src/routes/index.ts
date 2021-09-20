import { Router } from 'express';
// import routerCarrito from './routerCarrito';
import routerProductos from './routerProductos';

const router = Router();

// router.use('/carrito', routerCarrito)
router.use('/productos', routerProductos);

export default router;
