import { Router } from 'express';
import * as majorService from '../services/majorService.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/search', authenticate, async (req, res, next) => {
  try {
    const { q, university, category, province, accreditation, page, limit, sort, order } = req.query;
    const result = await majorService.searchMajors({
      query: q,
      university,
      category,
      province,
      accreditation,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      sort: sort || 'name',
      order: order || 'asc',
    });
    res.json(result);
  } catch (err) { next(err); }
});

router.get('/filters', authenticate, async (req, res, next) => {
  try {
    const filters = await majorService.getFilterOptions();
    res.json(filters);
  } catch (err) { next(err); }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const major = await majorService.getMajorDetail(req.params.id);
    res.json(major);
  } catch (err) { next(err); }
});

router.get('/:id/similar', authenticate, async (req, res, next) => {
  try {
    const similar = await majorService.getSimilarMajors(req.params.id);
    res.json(similar);
  } catch (err) { next(err); }
});

export default router;
