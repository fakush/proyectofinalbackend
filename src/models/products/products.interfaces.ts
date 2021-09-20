export interface newProductObject {
  nombre?: string;
  descripcion?: string;
  codigo?: string;
  foto?: string;
  precio?: number;
  stock?: number;
}
export interface ProductObject {
  _id?: string;
  timestamp: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}
export interface ProductQuery {
  nombre?: string;
  codigo?: string;
  precio?: number;
  precioMin?: string;
  precioMax?: string;
  stock?: number;
  stockMin?: string;
  stockMax?: string;
}
export interface ProductBaseClass {
  get(id?: string | undefined): Promise<ProductObject[]>;
  add(data: newProductObject): Promise<ProductObject>;
  update(id: string, data: newProductObject): Promise<ProductObject>;
  delete(id: string): Promise<void>;
  query(options: ProductQuery): Promise<ProductObject[]>;
}
