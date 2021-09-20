// import fs from 'fs';
// import path from 'path';

// export default class AuxFile {
//   fileName: string;
//   body: never[];

//   constructor(fileName: string) {
//     this.fileName = path.resolve(__dirname, `../../assets/${fileName}`);
//     this.body = [];
//   }

//   // No me deja hacer manejo de errores en TS
//   read() {
//     const data = fs.readFileSync(this.fileName, 'utf-8');
//     return data;
//   }

//   // No me deja hacer manejo de errores en TS
//   write(data: object) {
//     fs.writeFileSync(this.fileName, JSON.stringify(data));
//   }
// }
