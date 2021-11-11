import { Router } from 'express';
import { authAPI } from '../apis/UserAuthAPI';
import { logger } from '../middleware/logger';
import passportLocal from '../middleware/userAuth';
import { userStatus } from '../middleware/userStatus';
import { controllerProfilePic } from '../controllers/controllerProfilePic';
import { uploadProfilePic } from '../middleware/profilePics';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/', async (req, res) => {});

//Login Local
router.post('/login', passportLocal.authenticate('login'), function (req, res) {
  //   res.json({ msg: 'Welcome!', user: req.user });
  res.redirect('/');
});
// router.post('/login', (req, res, next) => {
//   passportLocal.authenticate('login', function (err, user, info) {
//     if (err) return res.redirect('/api/auth/local/fail', info);
//     if (!user) return res.redirect('/api/auth/local/fail', info);
//     //Cambio el password para no pasarlo al cliente.
//     user.password = '***PASSWORD***';
//     logger.log.debug(`REQ.SESSION =>\n${JSON.stringify(req.session)}`.cyan);
//     logger.log.debug(`REQ.USER =>\n${JSON.stringify(req.user)}`.cyan);
//     logger.log.debug(`REQ.AUTHENTICATE =>\n${JSON.stringify(req.isAuthenticated())}`.cyan);
//     res.json({ msg: 'Welcome!', user: req.user });
//   })(req, res, next);
// });

// Habilito el formulario de registro
router.post('/presignup', (req, res) => {
  userStatus.signUp = true;
  userStatus.login = false;
  res.redirect('/');
});

// Register Local
router.post(
  '/signup',
  // controllerProfilePic.hasImage,
  uploadProfilePic,
  controllerProfilePic.uploadImage,
  (req, res, next) => {
    passportLocal.authenticate('signup', function (err, user, info) {
      if (err) return res.redirect('/api/auth/local/fail', err);
      if (user.error) return res.redirect('/api/auth/local/fail', user.error);
      userStatus.signUp = false;
      userStatus.login = true;
      res.redirect('/', user);
    })(req, res, next);
  }
);

router.get('/logout', async (req, res) => {
  req.session.destroy;
  res.status(200).json({ msg: 'Logged out' });
});

//Logueo con éxito
router.get('/welcome', (req, res) => {
  res.status(200).json({ msg: 'bienvenido' });
});

//Logueo fallado
router.get('/fail', (req, res) => {
  res.status(400).json({ msg: 'Fallo el proceso de login' });
});

// Actualizar datos del usuario
router.put(
  '/update',
  asyncHandler(async (req, res) => {
    res.status(200).json({ msg: 'User Update not implemented yet' });
  })
);

//Cerrar sesión
router.post('/logout', (req: any, res) => {
  req.session.destroy;
  res.status(200).json({ msg: 'Cerramos la sesion' });
});

export default router;
