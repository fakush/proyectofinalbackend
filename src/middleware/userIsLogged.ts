import { Request, Response, NextFunction } from 'express';

export const userIsLogged = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Unauthorized User' });
  next();
};
