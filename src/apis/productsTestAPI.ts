import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

class ProductosTest {
  data: any[];

  constructor() {
    this.data = [];
  }

  findIndex(id: string) {
    return this.data.findIndex((aResource) => aResource.id == id);
  }

  getProducts(id: string = undefined) {
    if (this.data.length == 0) return ['no hay productos'];
    if (id) return this.data.filter((aResource) => aResource.id == id);
    return this.data;
  }

  addProducts() {
    this.data.push({
      id: uuidv4(),
      nombre: faker.commerce.product(),
      precio: faker.commerce.price(),
      foto: faker.image.technics()
    });
  }

  updateProducts(id: string, data: any) {
    const index = this.findIndex(id);
    const recursoViejo = this.data[index];
    const recursoNuevo = { id, ...data };
    const recursoActualizado = { ...recursoViejo, ...recursoNuevo };
    this.data.splice(index, 1, recursoActualizado);
  }

  deleteProducts(id: string) {
    const index = this.findIndex(id);
    this.data.splice(index, 1);
  }
}

export const ProductosTestAPI = new ProductosTest();
