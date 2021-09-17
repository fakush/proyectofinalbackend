export interface ProductObject {
  id: Number;
  timestamp: String;
  nombre: String;
  descripcion: String;
  codigo: String;
  foto: String;
  precio: Number;
  stock: Number;
}

export interface Product {
  _id: string;
  nombre: string;
  precio: number;
}

export interface ProductQuery {
  nombre?: string;
  precio?: number;
}

export interface ProductBaseClass {
  get(id?: string | undefined): Promise<Product[]>;
  add(data: ProductObject): Promise<Product>;
  update(id: string, newProductData: ProductObject): Promise<Product>;
  delete(id: string): Promise<void>;
  query(options: ProductQuery): Promise<Product[]>;
}
