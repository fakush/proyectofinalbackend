"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const UserAuthAPI_1 = require("../apis/UserAuthAPI");
const userStatus_1 = require("./userStatus");
const LocalStrategy = passport_local_1.default.Strategy;
const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
};
let user = {};
const loginFunc = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    user = yield UserAuthAPI_1.authAPI.findOneUser({ username });
    if (!user) {
        userStatus_1.userStatus.loginError = true;
        return done(null, 'false', { message: 'User does not exist' });
    }
    if (!(yield user.isValidPassword(password))) {
        userStatus_1.userStatus.loginError = true;
        return done(null, 'false', { message: 'Password is not valid.' });
    }
    userStatus_1.userStatus.notLogged = false;
    userStatus_1.userStatus.islogged = true;
    console.log('SALIO TODO BIEN');
    return done(null, user);
});
const signUpFunc = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield UserAuthAPI_1.authAPI.findOneUser(query);
        if (user) {
            console.log('User already exists');
            console.log(user);
            return done(null, false, 'User already exists');
        }
        else {
            const userData = { username, password, email, firstName, lastName };
            const newUser = UserAuthAPI_1.authAPI.signUpUser(userData);
            return done(null, newUser);
        }
    }
    catch (error) {
        done(error);
    }
});
passport_1.default.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport_1.default.use('signup', new LocalStrategy(strategyOptions, signUpFunc));
passport_1.default.serializeUser((user, done) => {
    console.log('user:', user);
    done(null, user);
});
passport_1.default.deserializeUser((userId, done) => {
    done(null, userId);
});
const isLoggedIn = (req, res, done) => {
    if (!req.user)
        return (userStatus_1.userStatus.loginError = true);
    // res.status(401).json({ msg: 'Unathorized' });
    done();
};
exports.isLoggedIn = isLoggedIn;
exports.default = passport_1.default;
