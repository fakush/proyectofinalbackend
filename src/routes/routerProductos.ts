import { Router } from 'express';
import { controllerProductos } from '../controllers/controllerProductos';
import { isAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductData:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *           description: ID del producto
 *           example: "614dfd26ea29ad3f194bad80"
 *         timestamp:
 *           type: String
 *           description: Fecha de creación o modificación del producto
 *           example: "Apr 5 05:06:08"
 *         nombre:
 *           type: String
 *           description: Nombre del producto
 *           example: "Pampers"
 *         descripcion:
 *           type: String
 *           description: Descripción del producto
 *           example: "Anoche cubrí, mis hijos dormidos, y el ruido del mar."
 *         codigo:
 *           type: String
 *           description: Código del producto
 *           example: "P0003"
 *         foto:
 *           type: String
 *           description: URL de la imagen del producto
 *           example: "https://picsum.photos/200"
 *         precio:
 *           type: number
 *           description: precio del producto
 *           example: 2000
 *         stock:
 *          type: number
 *          description: stock del producto
 *          example: 10
 *     NewProductInput:
 *       type: object
 *       properties:
 *         nombre:
 *           type: String
 *           description: Nombre del producto
 *           example: "Pampers"
 *         descripcion:
 *           type: String
 *           description: Descripción del producto
 *           example: "Anoche cubrí, mis hijos dormidos, y el ruido del mar."
 *         codigo:
 *           type: String
 *           description: Código del producto
 *           example: "P0003"
 *         foto:
 *           type: String
 *           description: URL de la imagen del producto
 *           example: "https://picsum.photos/200"
 *         precio:
 *           type: number
 *           description: precio del producto
 *           example: 2000
 *         stock:
 *          type: number
 *          description: stock del producto
 *          example: 10
 */

const router = Router();

/**
 * @swagger
 * /api/productos/:
 *   get:
 *     summary: Devuelve todos los productos
 *     responses:
 *       200:
 *         description: get array of products data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  $ref: '#/components/schemas/ProductData'
 *       400:
 *         description: Error al obtener los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error al obtener los productos"
 */
router.get('/', asyncHandler(controllerProductos.getProducts));

/**
 * @swagger
 * /api/productos/:id:
 *   get:
 *     summary: Devuelve un producto
 *     parameters:
 *       - in: path
 *         id: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: get product data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  $ref: '#/components/schemas/ProductData'
 *       400:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "product not found"
 *       401:
 *         description: ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Invalid Id"
 */
router.get('/:id', controllerProductos.checkValidId, asyncHandler(controllerProductos.getProducts));

/**
 * @swagger
 * /api/productos/:
 *   post:
 *     summary: Ingresa un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProductInput'
 *     responses:
 *       200:
 *         description: Devuelve el producto ingresado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  msg: 'creando productos'
 *                  $ref: '#/components/schemas/ProductData'
 *       400:
 *         description: "Falta ingresar alguno de los campos obligatorios: Nombre, Precio y Stock"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Falta ingresar alguno de los campos obligatorios: Nombre, Precio y Stock"
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
router.post(
  '/',
  isAdmin,
  controllerProductos.checkValidProduct,
  controllerProductos.checkValidTypes,
  asyncHandler(controllerProductos.addProducts)
);

/**
 * @swagger
 * /api/productos/:id:
 *   put:
 *     summary: Modifica un producto
 *     parameters:
 *       - in: path
 *         id: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProductInput'
 *     responses:
 *       200:
 *         description: Devuelve el producto ingresado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  msg: 'creando productos'
 *                  $ref: '#/components/schemas/ProductData'
 *       400:
 *         description: "Falta el id del producto"
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
 *         description: "ID no válido"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Invalid Id"
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
router.put(
  '/:id?',
  isAdmin,
  controllerProductos.checkValidId,
  controllerProductos.checkValidTypes,
  asyncHandler(controllerProductos.updateProducts)
);

/**
 * @swagger
 * /api/productos/:id:
 *   delete:
 *     summary: Elimina un producto
 *     parameters:
 *       - in: path
 *         id: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Devuelve la lista de productos actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  msg: 'borrando productos'
 *                  $ref: '#/components/schemas/ProductData'
 *       400:
 *         description: "Falta el id del producto"
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
 *         description: "ID no válido"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Invalid Id"
 */
router.delete('/:id?', isAdmin, controllerProductos.checkValidId, asyncHandler(controllerProductos.deleteProducts));

export default router;
