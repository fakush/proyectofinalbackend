import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { newUserObject, UserObject, UserBaseClass } from '../users.interfaces';
import Config from '../../../config';

const Schema = mongoose.Schema;
const dbCollection = 'users';

const UserSchema = new Schema<UserObject>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};
export class PersistenciaMongo implements UserBaseClass {
  private server: string;
  private users;
  private password: string;

  constructor(local: boolean = false) {
    // local
    //   ? (this.server = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`)
    //   : (this.server = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
    // mongoose.connect(this.server);
    this.users = mongoose.model<UserObject>(dbCollection, UserSchema);
    // logica para popular db vacia. (cambiar mockData por data a mockear)
    // this.users.count().then((count) => {
    //   if (count < 1) {
    //     console.log('Insertando Data Mockup');
    //     this.users.insertMany(mockData);
    //   }
    // });
  }

  async findOneUser(data: any): Promise<UserObject> {
    const query = {
      $or: [{ username: data.username }, { email: data.email }]
    };
    const user = await this.users.findOne(query);
    return user;
  }

  async findUser(userId: string): Promise<UserObject> {
    const user = await this.users.findById(userId);
    return user;
  }

  async login(data: newUserObject): Promise<UserObject> {
    const finder = data.username;
    const user = await this.users.findOne({ finder });
    return user;
  }

  async signUp(data: newUserObject): Promise<UserObject> {
    const addUser: UserObject = {
      username: data.username,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    };
    const newUser = new this.users(addUser);
    await newUser.save();
    return newUser;
  }
}
