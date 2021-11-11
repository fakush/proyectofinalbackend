import { newUserObject, UserObject } from '../models/users/users.interfaces';
import { UsersFactory, Persistencia } from '../models/users/users.factory';
import { cartAPI } from './cartAPI';

const tipo = Persistencia.MongoAtlas;

class authAPIClass {
  private auth;

  constructor() {
    this.auth = UsersFactory.get(tipo);
  }

  async findOneUser(data: any): Promise<UserObject> {
    return await this.auth.findOneUser(data);
  }

  async findUser(userId?: string): Promise<UserObject> {
    return await this.auth.findUser(userId);
  }

  async loginUser(data: newUserObject): Promise<UserObject> {
    return await this.auth.login(data);
  }

  async signUpUser(data: newUserObject): Promise<UserObject> {
    const newUser = await this.auth.signUp(data);
    await cartAPI.createCart(newUser._id);
    return newUser;
  }

  async ValidatePassword(username: string, password: string) {
    return this.auth.validateUserPassword(username, password);
  }
}

export const authAPI = new authAPIClass();
