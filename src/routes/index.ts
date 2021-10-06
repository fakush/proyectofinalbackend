import { Router } from 'express';
import routerCarrito from './routerCarrito';
import routerProductos from './routerProductos';
import routerVistaTest from './routerProductosVistaTest';
import routerUsers from './routerUsers';
import passport, { isLoggedIn } from '../middleware/userAuth';

const router = Router();

router.use('/productos/vista-test', routerVistaTest);
router.use('/carrito', routerCarrito);
router.use('/productos', routerProductos);
router.use('/user', isLoggedIn, routerUsers);
router.get('/hello', (req, res) => {
  res.json({ msg: 'HOLA', session: req.session });
});
router.post('/login', passport.authenticate('login'), function (req, res) {
  res.json({ msg: 'Welcome!', user: req.user });
});

router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', function (err, user, info) {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});

export default router;
