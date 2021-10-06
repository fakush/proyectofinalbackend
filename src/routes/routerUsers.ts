import { Router } from 'express';
import { authAPI } from '../apis/UserAuthAPI';

const router = Router();

router.get('/', async (req, res) => {
  const data = await authAPI.findUser;
  res.json({ data });
});

router.post('/', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  if (!username || !password || !email || !firstName || !lastName) {
    console.log('Invalid body fields');
    return res.status(400).json({ msg: 'Invalid fields' });
  }

  const userData = { username, password, email, firstName, lastName };

  const newUser = authAPI.signUpUser(userData);
  res.json({ data: newUser });
});

export default router;
