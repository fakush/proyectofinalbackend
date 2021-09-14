"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbCollection = 'productos';
const productsSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, default: 'Sin descripción' },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 }
});
exports.default = mongoose_1.default.model(dbCollection, productsSchema);
