import { Router } from 'express';
import * as predictionService from '../services/predictionService.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/:majorId', authenticate, async (req, res, next) => {
  try {
    const result = await predictionService.predictScore(req.params.majorId);
    res.json(result);
  } catch (err) { next(err); }
});

export default router;
