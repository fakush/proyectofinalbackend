// import mongoose from 'mongoose';
// import Products from '../models/products';
// import Messages from '../models/messages';

// class mongoDB {
//   connect() {
//     const init = async () => {
//       try {
//         const mongoUri: string = 'mongodb://localhost:27017/ecommerce';
//         await mongoose.connect(mongoUri);
//         console.log('Conectado a MongoDB');
//       } catch (e) {
//         console.log('Error:', e);
//       }
//     };
//     init();
//   }

//   find(id: number) {
//     return new Promise((resolve) => resolve(Products.count({ id: id })));
//   }

//   findGreatest() {
//     return new Promise((resolve) => resolve(Products.findOne().sort('-id')));
//   }

//   get(id: number | null = null) {
//     if (id) return new Promise((resolve) => resolve(Products.findOne({ id: id })));
//     return new Promise((resolve) => resolve(Products.find()));
//   }

//   create(data: any) {
//     return new Promise((resolve) => resolve(Products.create(data)));
//   }

//   update(id: number, data: any) {
//     return new Promise((resolve) => resolve(Products.findOneAndUpdate({ id: id }, { $set: data })));
//   }

//   delete(id: number) {
//     return new Promise((resolve) => resolve(Products.deleteOne({ id: id })));
//   }

//   addToLog(data: any) {
//     return new Promise((resolve) => resolve(Messages.create(data)));
//   }
// }

// export const mongoDBService = new mongoDB();
