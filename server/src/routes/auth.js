import { Router } from 'express';
import * as authService from '../services/authService.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }
    const result = await authService.register({ name, email, password });
    res.status(201).json(result);
  } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (err) { next(err); }
});

router.get('/verify', authenticate, async (req, res, next) => {
  try {
    const user = await authService.verify(req.user.id);
    res.json(user);
  } catch (err) { next(err); }
});

export default router;
