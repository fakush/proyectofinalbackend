import { Router } from 'express';
import routerCarrito from './routerCarrito';
import routerProductos from './routerProductos';
import routerVistaTest from './routerProductosVistaTest';

const router = Router();

router.use('/productos/vista-test', routerVistaTest);
router.use('/carrito', routerCarrito);
router.use('/productos', routerProductos);

export default router;
