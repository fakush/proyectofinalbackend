import { Router } from 'express';
import { logger } from '../middleware/logger';
import passport, { isLoggedIn } from '../middleware/userAuth-Facebook';
import { userStatus } from '../middleware/userStatus';
import { allArguments } from '../middleware/getArgs';
import { fork } from 'child_process';
import os from 'os';
import routerUsers from './routerUsers';
import { getprimes } from '../utils/isPrime';
import config from '../config';
import { EmailService } from '../services/mailer';
import moment from 'moment';
import path from 'path';

const scriptPath = path.resolve(__dirname, '../middleware/getRandoms');
const router = Router();

router.use('/user', isLoggedIn, routerUsers);
router.get('/hello', (req, res) => {
  userStatus.session = req.session;
  res.json({ msg: 'HOLA', userStatus });
});
router.get('/info', (req, res) => {
  let getData = {
    'Argumentos de entrada': allArguments,
    'Path de ejecución': process.cwd(),
    'Nombre de la plataforma': process.platform,
    'Process id': process.pid,
    'Versión de node': process.version,
    'Carpeta corriente': process.execPath,
    'Uso de memoria': process.memoryUsage(),
    'Numero de CPUs': os.cpus().length,
    '100 Primes': getprimes(1000)
  };
  res.json(getData);
  // logger.log.silly(getData);
});

router.get('/pid', (req, res) => {
  logger.log.info(`Hola desde ${process.pid}`.green);
  res.json({
    pid: process.pid
  });
});
router.get('/randoms', (req, res) => {
  logger.log.warn(`El proceso ${process.pid} entró en Random`.yellow);
  let numeros: number;
  req.query.cant ? (numeros = Number(req.query.cant)) : 100000000;
  const randoms = fork(scriptPath);
  const msg = { command: 'start', cantidad: numeros };
  randoms.send(JSON.stringify(msg));
  randoms.on('message', (result) => {
    res.json(result);
  });
});

router.get('/matar', (req, res) => {
  logger.log.error(`Matamos el proceso ${process.pid}`.red);
  process.exit(0);
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
    const myMail = {
      destination: config.ETHEREAL_EMAIL,
      subject: 'Nuevo Login en Facebook',
      content: `<h1>New Login</h1><p>New user logged: ${userStatus.nombre} - ${moment().format()}</p>`,
      attachments: [
        {
          filename: 'user.png',
          path: userStatus.foto
        }
      ]
    };
    EmailService.sendEmail(myMail.destination, myMail.subject, myMail.content);
    EmailService.sendGmail(userStatus.email, myMail.subject, myMail.content, myMail.attachments);
  }
  userStatus.login = false;
  userStatus.islogged = true;
  res.redirect('/');
  logger.log.info('hice el redirect');
});

router.get('/fail', (req, res) => {
  userStatus.loginError = true;
  res.redirect('/');
  logger.log.info('hice el redirect');
});

export default router;
