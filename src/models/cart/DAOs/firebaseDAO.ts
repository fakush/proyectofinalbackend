import admin from 'firebase-admin';
import { newCartObject, CartObject, CartBaseClass } from '../cart.interfaces';
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

export class PersistenciaFirebase implements CartBaseClass {
  private cartDB: any;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig)
    });
    const db = admin.firestore();
    this.cartDB = db.collection(dbCollection);
    this.cartDB.get().then((snapshoot: any) => {
      if (snapshoot.empty) mockData.forEach((item) => this.cartDB.doc(uuidv4()).set(item));
    });
  }

  async find(id: number): Promise<Boolean> {
    const item: any = await this.cartDB.doc(id);
    if (item == 0) return false;
    return true;
  }

  async get(id?: string): Promise<CartObject[]> {
    if (id) {
      const item: any = this.cartDB.doc(id);
      const doc = await item.get();
      if (!doc.exists) {
        return console.log('Documento invalido') as unknown as CartObject[];
      } else {
        return { id: doc.id, data: doc.data() } as unknown as CartObject[];
      }
    } else {
      let items: any = await this.cartDB.get();
      let docs = items.docs;
      const output = docs.map((aDoc: any) => ({
        id: aDoc.id,
        data: aDoc.data()
      }));
      return output;
    }
  }

  async add(data: newCartObject): Promise<CartObject> {
    const newItemData: CartObject = {
      timestamp: moment().format('MM DD hh:mm:ss'),
      producto: data
    };
    const docID = uuidv4();
    const newProduct: any = await this.cartDB
      .doc(docID)
      .set(newItemData)
      .then(async () => {
        const item: any = this.cartDB.doc(docID);
        const doc = await item.get();
        if (!doc.exists) {
          return console.log('Documento invalido') as unknown as CartObject[];
        } else {
          return { id: doc.id, data: doc.data() } as unknown as CartObject[];
        }
      });
    return newProduct;
  }

  async delete(id: string): Promise<void> {
    await this.cartDB.doc(id).delete();
  }
}
