import { Router } from 'express';
import routerCarrito from './routerCarrito';
import routerProductos from './routerProductos';
import routerVistaTest from './routerProductosVistaTest';
import routerUsers from './routerUsers';
import passport, { isLoggedIn } from '../middleware/userAuth';
import { userStatus } from '../middleware/userStatus';

const router = Router();

router.use('/productos/vista-test', routerVistaTest);
router.use('/carrito', routerCarrito);
router.use('/productos', routerProductos);
router.use('/user', isLoggedIn, routerUsers);
router.get('/hello', (req, res) => {
  userStatus.session = req.session;
  res.json({ msg: 'HOLA', userStatus });
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/datos',
    failureRedirect: '/api/fail'
  })
);

type Photos = { value: string };
type Emails = { value: string };
interface User extends Express.User {
  contador?: number;
  displayName?: string;
  photos?: Photos[];
  emails?: Emails[];
}

router.get('/datos', (req, res) => {
  if (req.isAuthenticated()) {
    const userData: User = req.user;
    userStatus.nombre = userData.displayName;
    if (userData.photos) userStatus.foto = userData.photos[0].value;
    if (userData.emails) userStatus.email = userData.emails[0].value;
  }
  userStatus.notLogged = false;
  userStatus.islogged = true;
  res.redirect('/');
  console.log('hice el redirect');
});

router.get('/fail', (req, res) => {
  userStatus.loginError = true;
  res.redirect('/');
  console.log('hice el redirect');
});

router.post('/logout', (req: any, res) => {
  userStatus.notLogged = true;
  userStatus.islogged = false;
  userStatus.isDestroyed = true;
  req.session.destroy;
  res.redirect('/');
});

export default router;
