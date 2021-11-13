import { Router } from 'express';
import { controllerOrders } from '../controllers/controllerOrders';

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderData:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *           description: ID del producto
 *           example: "614dfd26ea29ad3f194bad80"
 *         userId:
 *           type: String
 *           description: ID del usuario al que pertenece la orden
 *           example: "618d72256fc267b7222e8bce"
 *         products:
 *           type: Array
 *           description: Lista de productos que contiene la orden
 *           example: [{_id: "614dfd26ea29ad3f194bad80", amount: 1}]
 *     NewOrderInput:
 *       type: object
 *       properties:
 *         product:
 *           type: String
 *           description: ID del producto
 *           example: "614dfd26ea29ad3f194bad80"
 *         amount:
 *           type: Number
 *           description: Cantidad de productos
 *           example: 1
 */

const router = Router();

/**
 * @swagger
 * /api/orders/:id:
 *   get:
 *     summary: Devuelve una orden
 *     parameters:
 *       - in: path
 *         id: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: get product data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  $ref: '#/components/schemas/OrderData'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "missing parameters"
 *       401:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Order not found"
 */
router.get('/:id', controllerOrders.lookForId, controllerOrders.getOrders);

/**
 * @swagger
 * /api/orders/:id:
 *   post:
 *     summary: Crea una orden
 *     parameters:
 *       - in: path
 *         id: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewOrderInput'
 *     responses:
 *       200:
 *         description: get product data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  $ref: '#/components/schemas/OrderData'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "missing parameters"
 *       401:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Order not found"
 */
router.post('/:id', controllerOrders.lookForId, controllerOrders.createOrder);

export default router;
