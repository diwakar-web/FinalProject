import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';
import { handleValidation } from '../middlewares/validateRequest.js';

const router = Router();

router.post('/register',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  handleValidation,
  register
);

router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  handleValidation,
  login
);

export default router;
