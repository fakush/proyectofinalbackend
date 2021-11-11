import { Router } from 'express';
import { authAPI } from '../apis/UserAuthAPI';
import { logger } from '../middleware/logger';

//Todo: Legacy code, remove

const router = Router();
router.get('/', async (req, res) => {
  const data = await authAPI.findUser;
  res.json({ data });
});

router.post('/', async (req, res) => {
  const { username, password, email, firstName, lastName, address, phone, age, isAdmin, timestamp } = req.body;
  if (!username || !password || !email || !firstName || !lastName || !address || !phone || !age) {
    logger.log.debug('Invalid body fields');
    return res.status(400).json({ msg: 'Invalid fields' });
  }

  const userData = { username, password, email, firstName, lastName, address, phone, age, isAdmin, timestamp };
  const newUser = authAPI.signUpUser(userData);
  res.json({ data: newUser });
});

export default router;
