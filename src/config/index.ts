import dotenv from 'dotenv';
import { logger } from '../middleware/logger';
import path from 'path';

if (!process.env.NODE_ENV) {
  logger.log.warn('Inicializando en entorno: Default');
  dotenv.config();
} else {
  logger.log.warn('Inicializando en entorno: ', process.env.NODE_ENV);
  dotenv.config({ path: process.cwd() + process.env.NODE_ENV + '.env' });
}

const venv = {
  NODE_ENV: process.env.NODE_ENV,

  PORT: process.env.PORT || 8080,
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pwd',
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'dbNameLocal',

  FIREBASE_TYPE: process.env.FIREBASE_TYPE,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_CLIENT_C509_CERT_URL: process.env.FIREBASE_CLIENT_C509_CERT_URL,

  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,

  ETHEREAL_USERNAME: process.env.ETHEREAL_USERNAME,
  ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL,
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,

  GMAIL_USERNAME: process.env.GMAIL_USERNAME,
  GMAIL_EMAIL: process.env.GMAIL_EMAIL,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,

  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE,

  ADMIN_WHASTAPP_NUMBER: process.env.ADMIN_WHASTAPP_NUMBER,
  TWILIO_WHASTAPP_NUMBER: process.env.TWILIO_WHASTAPP_NUMBER
};

export default venv;
