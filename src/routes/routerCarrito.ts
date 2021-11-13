import { Router } from 'express';
import { controllerCarrito } from '../controllers/controllerCarrito';

/**
 * @swagger
 * components:
 *   schemas:
 *     CartData:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *           description: ID del producto
 *           example: "614dfd26ea29ad3f194bad80"
 *         userId:
 *           type: String
 *           description: ID del usuario al que pertenece el carrito
 *           example: "618d72256fc267b7222e8bce"
 *         products:
 *           type: Array
 *           description: Lista de productos que contiene el carrito
 *           example: [{product: "614dfd26ea29ad3f194bad80", amount: 1}]
 *     NewCartInput:
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
 * /api/carrito/:id:
 *   get:
 *     summary: Devuelve un carrito
 *     parameters:
 *       - in: path
 *         id: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario al que pertenece el carrito
 *     responses:
 *       200:
 *         description: get cart by userId
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  $ref: '#/components/schemas/CartData'
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
 *         description: Carrito no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "cart not found"
 */
router.get('/:id', controllerCarrito.lookForId, controllerCarrito.getCart);

/**
 * @swagger
 * /api/carrito/:id:
 *   post:
 *     summary: Ingresa un producto al carrito
 *     parameters:
 *       - in: path
 *         id: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario al que pertenece el carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCartInput'
 *     responses:
 *       200:
 *         description: Devuelve el carrito con el producto ingresado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  msg: 'creando productos'
 *                  $ref: '#/components/schemas/CartData'
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
 *         description: Carrito no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "cart not found"
 *       402:
 *         description: El tipo de dato para alguno de los campos es incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "El tipo de dato para alguno de los campos es incorrecto"
 */
router.post('/:id', controllerCarrito.lookForId, controllerCarrito.add2Cart);

/**
 * @swagger
 * /api/carrito/:id:
 *   delete:
 *     summary: Elimina un producto del carrito o actualiza la cantidad de productos
 *     parameters:
 *       - in: path
 *         id: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario al que pertenece el carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCartInput'
 *     responses:
 *       200:
 *         description: Devuelve el carrito con el producto ingresado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  msg: 'creando productos'
 *                  $ref: '#/components/schemas/CartData'
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
 *         description: Carrito no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "cart not found"
 *       402:
 *         description: El tipo de dato para alguno de los campos es incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "El tipo de dato para alguno de los campos es incorrecto"
 */
router.delete('/:id', controllerCarrito.lookForId, controllerCarrito.deleteProducts);

export default router;
