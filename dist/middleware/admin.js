"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const admin = true;
const isAdmin = (req, res, next) => {
    if (admin) {
        return next();
    }
    return res.status(401).json({
        msg: 'unauthorized user',
        descripcion: `error: ${req.url} unauthorized`
    });
};
exports.isAdmin = isAdmin;
