"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class AuxFile {
    constructor(fileName) {
        this.fileName = path_1.default.resolve(__dirname, `../../assets/${fileName}`);
        this.body = [];
    }
    // No me deja hacer manejo de errores en TS
    read() {
        const data = fs_1.default.readFileSync(this.fileName, 'utf-8');
        return data;
    }
    // No me deja hacer manejo de errores en TS
    write(data) {
        fs_1.default.writeFileSync(this.fileName, JSON.stringify(data));
    }
}
exports.default = AuxFile;
