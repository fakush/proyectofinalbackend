import { Request, Response, NextFunction } from 'express';
import { authAPI } from '../apis/UserAuthAPI';

class ControllerUsuarios {
  async hasImage(req: Request, res: Response, next: NextFunction) {
    // Si no hay imagen, se manda un error 404
    const file = req.file;
    if (!file) return res.status(400).json({ msg: 'missing file' });
    next();
  }
}

export const controllerUsuarios = new ControllerUsuarios();
