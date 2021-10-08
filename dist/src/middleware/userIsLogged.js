"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsLogged = void 0;
const userIsLogged = (req, res, next) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ msg: 'Unauthorized User' });
    next();
};
exports.userIsLogged = userIsLogged;
