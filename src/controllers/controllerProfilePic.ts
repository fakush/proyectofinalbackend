import { Request, Response, NextFunction } from 'express';
import { profilePicAPI } from '../apis/profilePicAPI';
import { logger } from '../middleware/logger';
import fs from 'fs';

const imagesFolderPath = process.cwd() + '/assets/images';

class ControllerProfilePic {
  async hasImage(req: Request, res: Response, next: NextFunction) {
    logger.log.info('Entre al controller');
    // Si no hay imagen, se manda un error 404
    console.log('REQ BODY ==>', req.body);
    console.log('REQ FILE ==>', req.file);
    const file = req.body.file;
    if (!file) return res.status(400).json({ msg: 'missing file' });
    next();
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const fileObject = {
      data: fs.readFileSync(imagesFolderPath + '/' + req.file.filename),
      contentType: 'image/png'
    };
    await profilePicAPI.addProfilePic(name, fileObject);
    next();
  }
}

export const controllerProfilePic = new ControllerProfilePic();
