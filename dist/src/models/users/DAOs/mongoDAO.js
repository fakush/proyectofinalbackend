"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenciaMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Schema = mongoose_1.default.Schema;
const dbCollection = 'users';
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const hash = yield bcrypt_1.default.hash(user.password, 10);
        this.password = hash;
        next();
    });
});
UserSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const compare = yield bcrypt_1.default.compare(password, user.password);
        return compare;
    });
};
class PersistenciaMongo {
    constructor(local = false) {
        // local
        //   ? (this.server = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`)
        //   : (this.server = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`);
        // mongoose.connect(this.server);
        this.users = mongoose_1.default.model(dbCollection, UserSchema);
        // logica para popular db vacia. (cambiar mockData por data a mockear)
        // this.users.count().then((count) => {
        //   if (count < 1) {
        //     console.log('Insertando Data Mockup');
        //     this.users.insertMany(mockData);
        //   }
        // });
    }
    findOneUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                $or: [{ username: data.username }, { email: data.email }]
            };
            const user = yield this.users.findOne(query);
            return user;
        });
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.findById(userId);
            return user;
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const finder = data.username;
            const user = yield this.users.findOne({ finder });
            return user;
        });
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const addUser = {
                username: data.username,
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName
            };
            const newUser = new this.users(addUser);
            yield newUser.save();
            return newUser;
        });
    }
}
exports.PersistenciaMongo = PersistenciaMongo;
