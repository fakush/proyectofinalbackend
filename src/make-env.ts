import fs from 'fs';
import { logger } from './middleware/logger';

fs.renameSync('../.env.example', './.env');
logger.log.info('.env file created');
