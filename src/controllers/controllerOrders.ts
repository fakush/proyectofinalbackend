import { Request, Response, NextFunction } from 'express';
import { cartAPI } from '../apis/cartAPI';
import { orderAPI } from '../apis/ordersAPI';
import { authAPI } from '../apis/UserAuthAPI';
import { EmailService } from '../services/mailer';
import { SmsService } from '../services/sms';
import { WhatsappService } from '../services/whatsapp';
import { logger } from '../middleware/logger';
import config from '../config';

class Orders {
  async lookForId(req: Request, res: Response, next: NextFunction) {
    // Si el id no existe, se manda un error 404
    const id = req.params.id;
    if (!id) return res.status(400).json({ msg: 'missing parameters' });
    next();
  }

  async getOrders(req: Request, res: Response) {
    const userId = req.params.id;
    const cart = await orderAPI.getOrders(userId);
    if (!cart) res.status(401).json({ msg: `Order not found` });
    return res.json({ data: cart });
  }

  async createOrder(req: Request, res: Response) {
    const cartId = req.params.id;
    const userData = await authAPI.findUser(cartId);
    logger.log.info(`Creating Order`);
    const newOrder = await orderAPI.createOrder(cartId);
    await cartAPI.emptyCart(cartId);
    // Enviando Email de notificación al administrador - OK
    EmailService.sendEmail(
      config.ETHEREAL_EMAIL,
      `Nuevo pedido de: ${userData.username} - ${userData.email}`,
      `Nuevo pedido: ${newOrder.products}`
    );
    // Enviar notificación a whatsapp
    const whatsappMessage = `Nuevo pedido de: ${userData.username} - ${userData.email}`;
    WhatsappService.sendMessage(`+${config.ADMIN_WHASTAPP_NUMBER}`, whatsappMessage);
    logger.log.info(`Enviando mensaje Whatsapp: ${whatsappMessage} al número ${config.ADMIN_WHASTAPP_NUMBER}`);
    // Enviando SMS de confirmación al usuario - OK
    const smsMessage = `Su pedido de: ${newOrder.products}. Ha sido recibido y se está preparando`;
    SmsService.sendMessage(`+${userData.phone}`, smsMessage);
    logger.log.info(`Enviando mensaje SMS: ${smsMessage} al número ${userData.phone}`);
    return res.json(newOrder);
  }
}

export const controllerOrders = new Orders();
