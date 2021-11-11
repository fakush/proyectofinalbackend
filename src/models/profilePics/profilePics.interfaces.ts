import { Schema } from 'mongoose';

export type userReference = Schema.Types.ObjectId | string;

export interface ProfilePicObject {
  name: string;
  img: any;
}

export interface PicObject {
  data: Buffer;
  contentType: String;
}

export interface ProfilePicBaseClass {
  getProfilePic(id: string): Promise<ProfilePicObject>;
  addProfilePic(name: string, img: PicObject): Promise<ProfilePicObject>;
  deleteProfilePic(id: string): Promise<ProfilePicObject>;
}
