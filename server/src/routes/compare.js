import { Router } from 'express';
import * as compareService from '../services/compareService.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { majorIds } = req.body;
    const result = await compareService.compareMajors(majorIds);
    res.json(result);
  } catch (err) { next(err); }
});

export default router;
