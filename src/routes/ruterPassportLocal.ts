import { Router } from 'express';
import { authAPI } from '../apis/UserAuthAPI';
import { logger } from '../middleware/logger';
import passportLocal from '../middleware/userAuth';
import { userStatus } from '../middleware/userStatus';
import { controllerProfilePic } from '../controllers/controllerProfilePic';
import { uploadProfilePic } from '../middleware/profilePics';
import asyncHandler from 'express-async-handler';

/**
 * @swagger
 * components:
 *   schemas:
 *     LocalUserData:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *           description: ID del usuario
 *           example: "618d72256fc267b7222e8bce"
 *         username:
 *           type: String
 *           description: Nombre de usuario
 *           example: "HomeroElGrande"
 *         email:
 *           type: String
 *           description: Correo electrónico del usuario
 *           example: homero@springfield.com
 *         password:
 *           type: String
 *           description: Contraseña del usuario
 *           example: "12345678"
 *         firstName:
 *           type: String
 *           description: Nombre del usuario
 *           example: "Homero"
 *         lastName:
 *           type: String
 *           description: Apellido del usuario
 *           example: "Simpson"
 *         address:
 *           type: String
 *           description: Dirección del usuario
 *           example: "Av. Siempreviva 456"
 *         phone:
 *           type: String
 *           description: Teléfono del usuario
 *           example: "54-11-34803233"
 *         age:
 *           type: Number
 *           description: Edad del usuario
 *           example: 38
 *         isAdmin:
 *           type: Boolean
 *           description: Indica si el usuario es administrador
 *           example: true
 *         timestamp:
 *           type: Date
 *           description: Fecha de creación / edición del usuario
 *           example: 2021-11-11T16:42:29-03:00
 *     NewLocalUserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: String
 *           description: Nombre de usuario
 *           example: "HomeroElGrande"
 *         email:
 *           type: String
 *           description: Correo electrónico del usuario
 *           example: homero@springfield.com
 *         password:
 *           type: String
 *           description: Contraseña del usuario
 *           example: "12345678"
 *         firstName:
 *           type: String
 *           description: Nombre del usuario
 *           example: "Homero"
 *         lastName:
 *           type: String
 *           description: Apellido del usuario
 *           example: "Simpson"
 *         address:
 *           type: String
 *           description: Dirección del usuario
 *           example: "Av. Siempreviva 456"
 *         phone:
 *           type: String
 *           description: Teléfono del usuario
 *           example: "54-11-34803233"
 *         age:
 *           type: Number
 *           description: Edad del usuario
 *           example: 38
 *         isAdmin:
 *           type: Boolean
 *           description: Indica si el usuario es administrador
 *           example: true
 *     LocalUserLogin:
 *       type: object
 *       properties:
 *         username:
 *           type: String
 *           description: correo electrónico del usuario
 *           example: homero@springfield.com
 *         password:
 *           type: String
 *           description: Contraseña del usuario
 *           example: "12345678"
 */

const router = Router();

router.get('/', async (req, res) => {});

/**
 * @swagger
 * /api/auth/local/login:
 *   post:
 *     summary: Iniciar sesión con usuario local
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocalUserLogin'
 *     responses:
 *       200:
 *         description: get user data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  $ref: '#/components/schemas/LocalUserData'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "User/Password are not valid"
 */
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

/**
 * @swagger
 * /api/auth/local/signup:
 *   post:
 *     summary: Registro de usuario local
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewLocalUserInput'
 *     responses:
 *       200:
 *         description: get user data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  $ref: '#/components/schemas/LocalUserData'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "User/Password are not valid"
 */
router.post(
  '/signup',
  // controllerProfilePic.hasImage,
  uploadProfilePic,
  //Todo: Corto el upload a Mongo, para que no tire error.
  // controllerProfilePic.uploadImage,
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
