import { ProfilePicObject, PicObject } from '../models/profilePics/profilePics.interfaces';
import { ProfilePicFactory, Persistencia } from '../models/profilePics/profilePics.factory';
import { authAPI } from './UserAuthAPI';
// import { productsAPI } from './productsAPI';
import { logger } from '../middleware/logger';

const tipo = Persistencia.MongoAtlas;

class ProfilePicAPIClass {
  private profilePic;

  constructor() {
    this.profilePic = ProfilePicFactory.get(tipo);
  }

  async getProfilePic(userId: string): Promise<ProfilePicObject> {
    return await this.profilePic.getProfilePic(userId);
  }

  async addProfilePic(userId: string, name: string, img: PicObject): Promise<ProfilePicObject> {
    const user = await authAPI.findUser(userId);
    logger.log.debug(`Creating profile picture for user ${user}`);
    if (!user) throw new Error('User does not exist. Error creating profile picture');
    const newPic = await this.profilePic.addProfilePic(userId, name, img);
    return newPic;
  }

  async deleteProfilePic(userId: string) {
    await this.profilePic.deleteProfilePic(userId);
  }
}

export const profilePicAPI = new ProfilePicAPIClass();
