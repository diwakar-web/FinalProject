import { Router } from 'express';
import { body } from 'express-validator';
import { listItems, getItem, createItem, updateStatus } from '../controllers/itemController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/fileUploader.js';
import { handleValidation } from '../middlewares/validateRequest.js';

const router = Router();

router.get('/', listItems);
router.get('/:id', getItem);

router.post('/',
  protect,
  upload.single('photo'),
  body('type').isIn(['lost', 'found']),
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('category').notEmpty(),
  body('location').notEmpty(),
  body('date').notEmpty(),
  handleValidation,
  createItem
);

router.patch('/:id/status', protect, body('status').isIn(['active','claimed','returned']), handleValidation, updateStatus);

export default router;
