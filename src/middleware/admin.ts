import { Request, Response, NextFunction } from 'express';

const admin = true;

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (admin) {
    return next();
  }
  return res.status(401).json({
    msg: 'unauthorized user',
    descripcion: `error: ${req.url} unauthorized`
  });
};
