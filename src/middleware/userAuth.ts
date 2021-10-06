import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { authAPI } from '../apis/UserAuthAPI';
import { Request, Response } from 'express';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: any = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
};

let user: any = {};

const loginFunc = async (req: Request, username: string, password: string, done: any) => {
  user = await authAPI.findOneUser({ username });

  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }
  if (!user.isValidPassword(password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }
  console.log('SALIO TODO BIEN');
  return done(null, user);
};

const signUpFunc = async (req: Request, username: string, password: string, done: any) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    console.log(req.body);
    if (!username || !password || !email || !firstName || !lastName) {
      console.log('Invalid body fields');
      return done(null, false);
    }

    const query = {
      $or: [{ username: username }, { email: email }]
    };

    console.log(query);
    const user = await authAPI.findOneUser(query);

    if (user) {
      console.log('User already exists');
      console.log(user);
      return done(null, false, 'User already exists');
    } else {
      const userData = { username, password, email, firstName, lastName };
      const newUser = authAPI.signUpUser(userData);
      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user, done) => {
  console.log('user:', user);
  done(null, user);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});

export const isLoggedIn = (req: Request, res: Response, done: any) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;
