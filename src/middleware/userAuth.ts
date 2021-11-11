import Config from '../config';
import passport from 'passport';
import moment from 'moment';
import { Strategy, VerifyFunctionWithRequest, IStrategyOptionsWithRequest } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { authAPI } from '../apis/UserAuthAPI';
import { newUserObject } from '../models/users/users.interfaces';
import { userJoiSchema } from '../models/users/users.interfaces';
import { isAdmin } from './admin';
import { userStatus } from './userStatus';
import { EmailService } from '../services/mailer';
import { logger } from './logger';
import colors from 'colors';
colors.enable();

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
};

const loginFunc: VerifyFunctionWithRequest = async (req: Request, username: string, password: string, done: any) => {
  const user = await authAPI.findOneUser({ username });
  if (!user) {
    logger.log.error(`Unvalid User == > ${username} Unvalid`.red);
    return done(null, false, { message: 'User/Password are not valid' });
  }

  const check = await authAPI.ValidatePassword(username, password);
  if (!check) {
    logger.log.error(`Unvalid Password == > ${user.password} reboto con password invalido`.red);
    return done(null, false, { message: 'User/Password are not valid' });
  }

  logger.log.info('SALIO TODO BIEN'.green);
  return done(null, user);
};

const signUpFunc = async (req: Request, email: string, password: string, done: any) => {
  try {
    const { firstName, lastName, username, email, password, address, age, phone, timestamp } = req.body;
    // isAdmin solo lo puede completar un usuario admin, por eso no se chequea.
    if (!firstName || !lastName || !username || !email || !password || !address || !age || !phone) {
      logger.log.error('Se deben completaro todos los campos y subir una imagen'.red);
      return done(null, false);
    }
    const user = await authAPI.findOneUser({ email });
    logger.log.info(`${user}`.blue);
    if (user) {
      logger.log.error('Passport Local ==> User already exists'.red);
      return done(null, false, 'User already exists');
    } else {
      logger.log.info('Passport Local ==> Creando Usuario'.green);
      const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
        address,
        age,
        isAdmin: false,
        timestamp,
        phone
      };
      userData.timestamp = moment().format();
      const newUser = authAPI.signUpUser(userData) as unknown as newUserObject;
      EmailService.sendEmail(Config.ETHEREAL_EMAIL, 'New Login', JSON.stringify(userData));
      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

passport.use('login', new Strategy(strategyOptions, loginFunc));
passport.use('signup', new Strategy(strategyOptions, signUpFunc));

passport.serializeUser(function (user, cb) {
  logger.log.info('Passport Local ==> Serialize User'.blue);
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  logger.log.info('Passport Local ==> Deserialize User'.blue);
  cb(null, obj);
});

export const isLoggedIn = (req: Request, res: Response, done: NextFunction) => {
  if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Unathorized' });
  done();
};

export default passport;
