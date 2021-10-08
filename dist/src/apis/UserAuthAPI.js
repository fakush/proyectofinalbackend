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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAPI = void 0;
const users_factory_1 = require("../models/users/users.factory");
const tipo = users_factory_1.Persistencia.MongoAtlas;
class authAPIClass {
    constructor() {
        this.auth = users_factory_1.UsersFactory.get(tipo);
    }
    findOneUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.auth.findOneUser(data);
        });
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.auth.findUser(userId);
        });
    }
    loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.auth.login(data);
        });
    }
    signUpUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.auth.signUp(data);
        });
    }
}
exports.authAPI = new authAPIClass();
