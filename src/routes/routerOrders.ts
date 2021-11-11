import { Router } from 'express';
import { controllerOrders } from '../controllers/controllerOrders';

const router = Router();

router.get('/:id', controllerOrders.lookForId, controllerOrders.getOrders);

router.post('/:id', controllerOrders.lookForId, controllerOrders.createOrder);

export default router;
