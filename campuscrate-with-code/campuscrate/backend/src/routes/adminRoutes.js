import { Router } from 'express';
import { dashboard, blockUser } from '../controllers/adminController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/dashboard', protect, isAdmin, dashboard);
router.patch('/block/:userId', protect, isAdmin, blockUser);

export default router;
