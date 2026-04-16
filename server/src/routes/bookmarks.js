import { Router } from 'express';
import * as bookmarkService from '../services/bookmarkService.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const bookmarks = await bookmarkService.getBookmarks(req.user.id);
    res.json(bookmarks);
  } catch (err) { next(err); }
});

router.post('/:majorId', authenticate, async (req, res, next) => {
  try {
    const bookmark = await bookmarkService.addBookmark(req.user.id, req.params.majorId);
    res.status(201).json(bookmark);
  } catch (err) { next(err); }
});

router.delete('/:majorId', authenticate, async (req, res, next) => {
  try {
    await bookmarkService.removeBookmark(req.user.id, parseInt(req.params.majorId));
    res.json({ message: 'Bookmark dihapus' });
  } catch (err) { next(err); }
});

export default router;
