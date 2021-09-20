import admin from 'firebase-admin';
import { newProductObject, ProductObject, ProductQuery, ProductBaseClass } from '../products.interfaces';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig: any = {
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

export class PersistenciaFirebase implements ProductBaseClass {
  private productsDB: any;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig)
    });
    const db = admin.firestore();
    this.productsDB = db.collection(dbCollection);
    this.productsDB.get().then((snapshoot: any) => {
      if (snapshoot.empty) mockData.forEach((item) => this.productsDB.doc(uuidv4()).set(item));
    });
  }

  async find(id: string): Promise<Boolean> {
    const item: any = await this.productsDB.doc(id);
    if (item == 0) return false;
    return true;
  }

  async get(id?: string): Promise<ProductObject[]> {
    if (id) {
      const item: any = this.productsDB.doc(id);
      const doc = await item.get();
      if (!doc.exists) {
        return console.log('Documento invalido') as unknown as ProductObject[];
      } else {
        return { id: doc.id, data: doc.data() } as unknown as ProductObject[];
      }
    } else {
      let items: any = await this.productsDB.get();
      let docs = items.docs;
      const output = docs.map((aDoc: any) => ({
        id: aDoc.id,
        data: aDoc.data()
      }));
      return output;
    }
  }

  async add(data: newProductObject): Promise<ProductObject> {
    const newItem: ProductObject = {
      timestamp: moment().format('MM DD hh:mm:ss'),
      nombre: data.nombre!,
      descripcion: data.descripcion || 'Sin descripción',
      codigo: data.codigo || 'P0000',
      foto: data.foto || 'https://picsum.photos/200',
      precio: data.precio!,
      stock: data.stock!
    };
    const docID = uuidv4();
    const newProduct: any = await this.productsDB
      .doc(docID)
      .set(newItem)
      .then(async () => {
        const item: any = this.productsDB.doc(docID);
        const doc = await item.get();
        if (!doc.exists) {
          return console.log('Documento invalido') as unknown as ProductObject[];
        } else {
          return { id: doc.id, data: doc.data() } as unknown as ProductObject[];
        }
      });
    return newProduct;
  }

  async update(id: string, data: newProductObject): Promise<ProductObject> {
    const updateItem: any = data;
    updateItem.timestamp = moment().format('MM DD hh:mm:ss');
    const updatedProduct: any = await this.productsDB
      .doc(id)
      .update(updateItem)
      .then(async () => {
        const item: any = this.productsDB.doc(id);
        const doc = await item.get();
        if (!doc.exists) {
          return console.log('Documento invalido') as unknown as ProductObject[];
        } else {
          return { id: doc.id, data: doc.data() } as unknown as ProductObject[];
        }
      });
    return updatedProduct;
  }

  async delete(id: string) {
    await this.productsDB.doc(id).delete();
  }

  async query(options: ProductQuery): Promise<ProductObject[]> {
    let filteredCollection = this.productsDB;
    if (options.nombre) filteredCollection = filteredCollection.where('nombre', '==', options.nombre);
    if (options.codigo) filteredCollection = filteredCollection.where('codigo', '==', options.codigo);
    if (options.precio) filteredCollection = filteredCollection.where('precio', '==', options.precio);
    if (options.precioMin) filteredCollection = filteredCollection.where('precio', '>=', options.precioMin);
    if (options.precioMax) filteredCollection = filteredCollection.where('precio', '<=', options.precioMax);
    if (options.stock) filteredCollection = filteredCollection.where('stock', '==', options.stock);
    if (options.stockMin) filteredCollection = filteredCollection.where('stock', '>=', options.stockMin);
    if (options.stockMax) filteredCollection = filteredCollection.where('stock', '<=', options.stockMax);
    let items: any = await filteredCollection.get();
    let docs = items.docs;
    const output = docs.map((aDoc: any) => ({
      id: aDoc.id,
      data: aDoc.data()
    }));
    return output;
  }
}
