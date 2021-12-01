export class Chat {
  private _id?: string;
  private nombre: string;
  private mensaje: string;
  private timestamp: string;

  constructor(_id: string, nombre: string, mensaje: string, timestamp: string) {
    this._id = _id;
    this.nombre = nombre;
    this.mensaje = mensaje;
    this.timestamp = timestamp;
  }
}
