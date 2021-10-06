import { newUserObject, UserObject } from '../models/users/users.interfaces';
import { UsersFactory, Persistencia } from '../models/users/users.factory';

const tipo = Persistencia.MongoAtlas;

class authAPIClass {
  private auth;

  constructor() {
    this.auth = UsersFactory.get(tipo);
  }

  async pre(user: any): Promise<any> {
    return await this.auth.pre(user);
  }

  async isValidPassword(user: any): Promise<any> {
    return await this.auth.isValidPassword(user);
  }

  async findOneUser(data: any): Promise<UserObject> {
    return await this.auth.findOneUser(data);
  }

  async findUser(userId: string): Promise<UserObject> {
    return await this.auth.findUser(userId);
  }

  async loginUser(data: newUserObject): Promise<UserObject> {
    return await this.auth.login(data);
  }

  async signUpUser(data: newUserObject): Promise<UserObject> {
    return await this.auth.signUp(data);
  }
}

export const authAPI = new authAPIClass();
