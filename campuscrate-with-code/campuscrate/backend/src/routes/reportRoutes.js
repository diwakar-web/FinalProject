import { Router } from 'express';
import { reportAbuse } from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', protect, reportAbuse);

export default router;
