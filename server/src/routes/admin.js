import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import * as adminService from '../services/adminService.js';

const router = Router();
router.use(authenticate, requireAdmin);

// Universities
router.get('/universities', async (req, res, next) => {
  try { res.json(await adminService.getUniversities()); } catch (err) { next(err); }
});
router.post('/universities', async (req, res, next) => {
  try { res.status(201).json(await adminService.createUniversity(req.body)); } catch (err) { next(err); }
});
router.put('/universities/:id', async (req, res, next) => {
  try { res.json(await adminService.updateUniversity(req.params.id, req.body)); } catch (err) { next(err); }
});
router.delete('/universities/:id', async (req, res, next) => {
  try { res.json(await adminService.deleteUniversity(req.params.id)); } catch (err) { next(err); }
});

// Majors
router.get('/majors', async (req, res, next) => {
  try { res.json(await adminService.getMajors(req.query.universityId)); } catch (err) { next(err); }
});
router.post('/majors', async (req, res, next) => {
  try { res.status(201).json(await adminService.createMajor(req.body)); } catch (err) { next(err); }
});
router.put('/majors/:id', async (req, res, next) => {
  try { res.json(await adminService.updateMajor(req.params.id, req.body)); } catch (err) { next(err); }
});
router.delete('/majors/:id', async (req, res, next) => {
  try { res.json(await adminService.deleteMajor(req.params.id)); } catch (err) { next(err); }
});

// Statistics
router.get('/statistics/:majorId', async (req, res, next) => {
  try { res.json(await adminService.getStatistics(req.params.majorId)); } catch (err) { next(err); }
});
router.post('/statistics', async (req, res, next) => {
  try { res.status(201).json(await adminService.createStatistic(req.body)); } catch (err) { next(err); }
});
router.put('/statistics/:id', async (req, res, next) => {
  try { res.json(await adminService.updateStatistic(req.params.id, req.body)); } catch (err) { next(err); }
});
router.delete('/statistics/:id', async (req, res, next) => {
  try { res.json(await adminService.deleteStatistic(req.params.id)); } catch (err) { next(err); }
});

export default router;
