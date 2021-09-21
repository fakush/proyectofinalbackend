export interface newChatObject {
  nombre: string;
  mensaje: string;
  timestamp: string;
}
export interface ChatObject {
  _id?: string;
  nombre: string;
  mensaje: string;
  timestamp: string;
}

export interface ChatBaseClass {
  add(data: newChatObject): Promise<ChatObject>;
}
