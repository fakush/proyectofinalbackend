import { ProfilePicObject, PicObject } from '../models/profilePics/profilePics.interfaces';
import { ProfilePicFactory, Persistencia } from '../models/profilePics/profilePics.factory';
import { authAPI } from './UserAuthAPI';
// import { productsAPI } from './productsAPI';
import { logger } from '../middleware/logger';
import { log } from 'util';

const tipo = Persistencia.MongoAtlas;

class ProfilePicAPIClass {
  private profilePic;

  constructor() {
    this.profilePic = ProfilePicFactory.get(tipo);
  }

  async getProfilePic(userId: string): Promise<ProfilePicObject> {
    return await this.profilePic.getProfilePic(userId);
  }

  async addProfilePic(name: string, img: PicObject): Promise<ProfilePicObject> {
    logger.log.debug(`Creating profile picture`);
    const newPic = await this.profilePic.addProfilePic(name, img);
    logger.log.debug(`Profile picture created`);
    logger.log.debug(newPic);
    return newPic;
  }

  async deleteProfilePic(userId: string) {
    await this.profilePic.deleteProfilePic(userId);
  }
}

export const profilePicAPI = new ProfilePicAPIClass();
