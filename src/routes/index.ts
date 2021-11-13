import { Router } from 'express';
import routerCarrito from './routerCarrito';
import routerProductos from './routerProductos';
import routerVistaTest from './routerProductosVistaTest';
import routerPassportLocal from './ruterPassportLocal';
import routerOrders from './routerOrders';
import routerTests from './routerTests';
import { userStatus } from '../middleware/userStatus';

const router = Router();

router.use('/productos/vista-test', routerVistaTest);
router.use('/carrito', routerCarrito);
router.use('/productos', routerProductos);
router.use('/auth/local', routerPassportLocal);
router.use('/orders', routerOrders);

//Se pasan a esta ruta los endpoints para testear
router.use('/test', routerTests);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Termina la sesión del usuario
 *     responses:
 *       200:
 *         description: req.session.destroy
 *         content:
 *         redirect: /
 */
router.post('/auth/logout', (req: any, res) => {
  userStatus.login = true;
  userStatus.islogged = false;
  userStatus.isDestroyed = true;
  req.session.destroy;
  res.status(200).redirect('/');
});

export default router;
