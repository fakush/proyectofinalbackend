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
const colors_1 = __importDefault(require("colors"));
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const config_1 = __importDefault(require("../config"));
colors_1.default.enable();
const strategyOptions = {
    clientID: config_1.default.FACEBOOK_APP_ID,
    clientSecret: config_1.default.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails']
};
const loginFunc = (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('SALIO TODO BIEN'.green);
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return done(null, profile);
});
passport_1.default.use(new passport_facebook_1.Strategy(strategyOptions, loginFunc));
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user);
});
passport_1.default.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
const isLoggedIn = (req, res, done) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ msg: 'Unathorized' });
    done();
};
exports.isLoggedIn = isLoggedIn;
exports.default = passport_1.default;
