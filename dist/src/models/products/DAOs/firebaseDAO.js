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
const dbCollection = 'productos';
const mockData = [
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'BMW',
        descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 2751,
        stock: 8
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Kleenex',
        descripcion: 'Cuando canta la cigarra, cuando canta, canta en coro y el sol muere.',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 1898,
        stock: 12
    },
    {
        timestamp: 'Apr 4 05:06:07',
        nombre: 'Johnson & Johnson',
        descripcion: 'Esta primavera en mi cabaña, Absolutamente nada, Absolutamente todo',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 570,
        stock: 7
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Colgate',
        descripcion: 'Primavera en el hogar, No hay nada, y sin embargo hay de todo',
        codigo: 'P0001',
        foto: 'https://picsum.photos/200',
        precio: 3613,
        stock: 25
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Pampers',
        descripcion: 'Anoche cubrí, mis hijos dormidos, y el ruido del mar.',
        codigo: 'P0003',
        foto: 'https://picsum.photos/200',
        precio: 856,
        stock: 21
    },
    {
        timestamp: 'Apr 4 05:06:09',
        nombre: 'Nike',
        descripcion: 'Mil pequeños peces blancos, Como si hirviera, El color del agua',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 4796,
        stock: 12
    },
    {
        timestamp: 'Apr 4 05:06:09',
        nombre: 'Disney',
        descripcion: 'Pareciera que el sapo, Va a expeler, una nube',
        codigo: 'P0004',
        foto: 'https://picsum.photos/200',
        precio: 1201,
        stock: 16
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Pampers',
        descripcion: 'Mi cuenco de mendigar, Acepta hojas caídas',
        codigo: 'P0005',
        foto: 'https://picsum.photos/200',
        precio: 514,
        stock: 1
    },
    {
        timestamp: 'Apr 5 05:06:08',
        nombre: 'Audi',
        descripcion: 'Bajo la lluvia de verano, El sendero, Desapareció',
        codigo: 'P0002',
        foto: 'https://picsum.photos/200',
        precio: 2457,
        stock: 15
    }
];
class PersistenciaFirebase {
    constructor() {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(firebaseConfig)
        });
        const db = firebase_admin_1.default.firestore();
        this.productsDB = db.collection(dbCollection);
        this.productsDB.get().then((snapshoot) => {
            if (snapshoot.empty)
                mockData.forEach((item) => this.productsDB.doc((0, uuid_1.v4)()).set(item));
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.productsDB.doc(id);
            if (item == 0)
                return false;
            return true;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const item = this.productsDB.doc(id);
                const doc = yield item.get();
                if (!doc.exists) {
                    return console.log('Documento invalido');
                }
                else {
                    return { id: doc.id, data: doc.data() };
                }
            }
            else {
                let items = yield this.productsDB.get();
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
            const newItem = {
                timestamp: (0, moment_1.default)().format('MM DD hh:mm:ss'),
                nombre: data.nombre,
                descripcion: data.descripcion || 'Sin descripción',
                codigo: data.codigo || 'P0000',
                foto: data.foto || 'https://picsum.photos/200',
                precio: data.precio,
                stock: data.stock
            };
            const docID = (0, uuid_1.v4)();
            const newProduct = yield this.productsDB
                .doc(docID)
                .set(newItem)
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const item = this.productsDB.doc(docID);
                const doc = yield item.get();
                if (!doc.exists) {
                    return console.log('Documento invalido');
                }
                else {
                    return { id: doc.id, data: doc.data() };
                }
            }));
            return newProduct;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateItem = data;
            updateItem.timestamp = (0, moment_1.default)().format('MM DD hh:mm:ss');
            const updatedProduct = yield this.productsDB
                .doc(id)
                .update(updateItem)
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const item = this.productsDB.doc(id);
                const doc = yield item.get();
                if (!doc.exists) {
                    return console.log('Documento invalido');
                }
                else {
                    return { id: doc.id, data: doc.data() };
                }
            }));
            return updatedProduct;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productsDB.doc(id).delete();
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let filteredCollection = this.productsDB;
            if (options.nombre)
                filteredCollection = filteredCollection.where('nombre', '==', options.nombre);
            if (options.codigo)
                filteredCollection = filteredCollection.where('codigo', '==', options.codigo);
            if (options.precio)
                filteredCollection = filteredCollection.where('precio', '==', Number(options.precio));
            if (options.precioMin)
                filteredCollection = filteredCollection.where('precio', '>=', Number(options.precioMin));
            if (options.precioMax)
                filteredCollection = filteredCollection.where('precio', '<=', Number(options.precioMax));
            if (options.stock)
                filteredCollection = filteredCollection.where('stock', '==', Number(options.stock));
            if (options.stockMin)
                filteredCollection = filteredCollection.where('stock', '>=', Number(options.stockMin));
            if (options.stockMax)
                filteredCollection = filteredCollection.where('stock', '<=', Number(options.stockMax));
            try {
                let items = yield filteredCollection.get();
                let docs = items.docs;
                const output = docs.map((aDoc) => ({
                    id: aDoc.id,
                    data: aDoc.data()
                }));
                return output;
            }
            catch (error) {
                console.log('No se permiten consultas con más de un tipo de condicional por rango');
                return 'No se permiten consultas con más de un tipo de condicional por rango';
            }
        });
    }
}
exports.PersistenciaFirebase = PersistenciaFirebase;
