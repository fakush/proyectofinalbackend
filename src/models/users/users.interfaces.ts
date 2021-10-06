export interface newUserObject {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserObject {
  _id?: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserBaseClass {
  login(data: newUserObject): Promise<UserObject>;
  signUp(data: newUserObject): Promise<UserObject>;
}
