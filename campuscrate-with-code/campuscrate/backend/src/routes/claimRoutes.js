import { Router } from 'express';
import { body } from 'express-validator';
import { createClaim, listClaimsForItem, resolveClaim } from '../controllers/claimController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { handleValidation } from '../middlewares/validateRequest.js';

const router = Router();

router.get('/item/:itemId', protect, listClaimsForItem);

router.post('/',
  protect,
  body('itemId').notEmpty(),
  body('message').optional(),
  body('answer').optional(),
  handleValidation,
  createClaim
);

router.patch('/:claimId',
  protect,
  body('status').isIn(['approved','rejected']),
  handleValidation,
  resolveClaim
);

export default router;
