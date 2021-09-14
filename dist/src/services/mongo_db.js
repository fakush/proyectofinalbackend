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
exports.mongoDBService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const products_1 = __importDefault(require("../models/products"));
const messages_1 = __importDefault(require("../models/messages"));
class mongoDB {
    connect() {
        const init = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const mongoUri = 'mongodb://localhost:27017/ecommerce';
                yield mongoose_1.default.connect(mongoUri);
                console.log('Conectado a MongoDB');
            }
            catch (e) {
                console.log('Error:', e);
            }
        });
        init();
    }
    find(id) {
        return new Promise((resolve) => resolve(products_1.default.count({ id: id })));
    }
    findGreatest() {
        return new Promise((resolve) => resolve(products_1.default.findOne().sort('-id')));
    }
    get(id = null) {
        if (id)
            return new Promise((resolve) => resolve(products_1.default.findOne({ id: id })));
        return new Promise((resolve) => resolve(products_1.default.find()));
    }
    create(data) {
        return new Promise((resolve) => resolve(products_1.default.create(data)));
    }
    update(id, data) {
        return new Promise((resolve) => resolve(products_1.default.findOneAndUpdate({ id: id }, { $set: data })));
    }
    delete(id) {
        return new Promise((resolve) => resolve(products_1.default.deleteOne({ id: id })));
    }
    addToLog(data) {
        return new Promise((resolve) => resolve(messages_1.default.create(data)));
    }
}
exports.mongoDBService = new mongoDB();
