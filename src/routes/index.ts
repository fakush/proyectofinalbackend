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
router.post('/login', passport.authenticate('login'), function (req, res) {
  console.log('req.user: ', req.user);
  if ((req.user = 'false')) {
    userStatus.loginError = true;
  } else {
    userStatus.loginError = false;
  }
  userStatus.nombre = req.body.username;
  res.redirect('/');
});

router.post('/presignup', (req, res, next) => {
  userStatus.notLogged = false;
  userStatus.islogged = false;
  userStatus.signUp = true;
  res.redirect('/');
});

router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', function (err, user, info) {
    console.log(err, user, info);
    if (err) {
      userStatus.signUpError = true;
      res.redirect('/');
    }
    if (!user) {
      userStatus.signUpError = true;
      res.redirect('/');
    }
    userStatus.notLogged = true;
    userStatus.signUp = false;
    userStatus.signUpOK = true;
    res.redirect('/');
  })(req, res, next);
});

router.post('/logout', (req: any, res) => {
  userStatus.notLogged = true;
  userStatus.islogged = false;
  userStatus.isDestroyed = true;
  req.session.destroy;
  res.redirect('/');
});

export default router;
