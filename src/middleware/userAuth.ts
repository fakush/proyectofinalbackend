import colors from 'colors';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { VerifyFunction, StrategyOption, Strategy as FaceBookStrategy } from 'passport-facebook';
import Config from '../config';
import { fbClientIdArgument, fbClientSecretArgument } from './getArgs';
import { logger } from './logger';
colors.enable();

const strategyOptions: StrategyOption = {
  clientID: fbClientIdArgument || Config.FACEBOOK_APP_ID,
  clientSecret: fbClientSecretArgument || Config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails']
};

const loginFunc: VerifyFunction = async (accessToken, refreshToken, profile, done) => {
  logger.log.info('SALIO TODO BIEN'.green);
  logger.log.debug(accessToken);
  logger.log.debug(refreshToken);
  logger.log.debug(profile);
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
});

export const isLoggedIn = (req: Request, res: Response, done: NextFunction) => {
  if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Unathorized' });
  done();
};

export default passport;
