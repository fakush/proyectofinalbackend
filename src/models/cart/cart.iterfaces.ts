export interface newCartObject {
  producto: any;
}
export interface CartObject {
  _id?: string;
  timestamp: string;
  producto: any;
}

export interface CartBaseClass {
  get(id?: string | undefined): Promise<CartObject[]>;
  add(data: newCartObject): Promise<CartObject>;
  delete(id: string): Promise<void>;
}
