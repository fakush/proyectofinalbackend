import mongoose, { Schema } from 'mongoose';
import { ProfilePicObject, ProfilePicBaseClass, PicObject } from '../profilePics.interfaces';
import { logger } from '../../../middleware/logger';

//MongoSchema
const profilePicSchema = new mongoose.Schema<ProfilePicObject>({
  id: { type: Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true },
  img: { type: Object, required: true }
});

const dbCollection = 'profilePics';
export class PersistenciaMongo implements ProfilePicBaseClass {
  private profilePic;

  constructor() {
    this.profilePic = mongoose.model<ProfilePicObject>(dbCollection, profilePicSchema);
  }

  async find(id: string): Promise<Boolean> {
    const item: any = await this.profilePic.findById(id);
    if (item == 0) return false;
    return true;
  }

  async getProfilePic(userId: string): Promise<ProfilePicObject> {
    const item = await this.profilePic.findOne({ userId });
    if (!item) throw new Error('No existe la imagen en la DB');
    return item;
  }

  async addProfilePic(userId: string, name: string, img: PicObject): Promise<ProfilePicObject> {
    const newProfilePic = new this.profilePic({ userId, name, img });
    await newProfilePic.save();
    return newProfilePic;
  }

  async deleteProfilePic(userId: string): Promise<ProfilePicObject> {
    const item = await this.profilePic.findByIdAndDelete(userId);
    if (!item) throw new Error('No existe orden del usuario');
    return item;
  }
}
