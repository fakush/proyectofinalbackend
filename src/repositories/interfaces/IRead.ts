export interface IRead<T> {
  // <T> generics, es decir, puede ser cualquier tipo de mensaje.
  getAll(item?: T): Promise<T[]>;
  //   findOne(id: string): Promise<T>;
}
