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
exports.PersistenciaFirebase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
const logger_1 = require("../../../middleware/logger");
const firebaseConfig = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_C509_CERT_URL
};
const dbCollection = 'carrito';
const mockData = [
    {
        timestamp: 'Apr 4 05:06:07',
        producto: {
            id: 0,
            timestamp: 'Apr 4 05:06:07',
            nombre: 'Porsche',
            descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
            codigo: 'P0001',
            foto: 'https://picsum.photos/200',
            precio: 480,
            stock: 17
        }
    },
    {
        timestamp: 'Apr 6 05:06:08',
        producto: {
            id: 4,
            timestamp: 'Apr 5 05:06:08',
            nombre: 'Colgate',
            descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
            codigo: 'P0001',
            foto: 'https://picsum.photos/200',
            precio: 613,
            stock: 25
        }
    },
    {
        timestamp: 'Apr 6 05:06:08',
        producto: {
            id: 4,
            timestamp: 'Apr 5 05:06:08',
            nombre: 'Colgate',
            descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
            codigo: 'P0001',
            foto: 'https://picsum.photos/200',
            precio: 613,
            stock: 25
        }
    }
];
class PersistenciaFirebase {
    constructor() {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(firebaseConfig)
        });
        const db = firebase_admin_1.default.firestore();
        this.cartDB = db.collection(dbCollection);
        this.cartDB.get().then((snapshoot) => {
            if (snapshoot.empty)
                mockData.forEach((item) => this.cartDB.doc((0, uuid_1.v4)()).set(item));
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.cartDB.doc(id);
            if (item == 0)
                return false;
            return true;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const item = this.cartDB.doc(id);
                const doc = yield item.get();
                if (!doc.exists) {
                    return logger_1.logger.log.error('Documento invalido');
                }
                else {
                    return { id: doc.id, data: doc.data() };
                }
            }
            else {
                let items = yield this.cartDB.get();
                let docs = items.docs;
                const output = docs.map((aDoc) => ({
                    id: aDoc.id,
                    data: aDoc.data()
                }));
                return output;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItemData = {
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                producto: data
            };
            const docID = (0, uuid_1.v4)();
            const newProduct = yield this.cartDB
                .doc(docID)
                .set(newItemData)
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const item = this.cartDB.doc(docID);
                const doc = yield item.get();
                if (!doc.exists) {
                    return logger_1.logger.log.error('Documento invalido');
                }
                else {
                    return { id: doc.id, data: doc.data() };
                }
            }));
            return newProduct;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cartDB.doc(id).delete();
        });
    }
}
exports.PersistenciaFirebase = PersistenciaFirebase;
