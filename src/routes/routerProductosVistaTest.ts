import { Router } from 'express';
import { controllerProductosTest } from '../controllers/controllerProductosVistaTest';
import asyncHandler from 'express-async-handler';

const routerVistaTest = Router();

routerVistaTest.get('/:id?', asyncHandler(controllerProductosTest.getProducts));
routerVistaTest.post('/:cant?', asyncHandler(controllerProductosTest.makeProducts));
routerVistaTest.put('/:id?', asyncHandler(controllerProductosTest.updateProducts));
routerVistaTest.delete('/:id?', asyncHandler(controllerProductosTest.deleteProducts));

export default routerVistaTest;
