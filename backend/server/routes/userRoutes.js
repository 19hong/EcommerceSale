import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
} from '../controllers/userController.js';

const router = Router();

router.use(protect);

router.get('/', authorize('admin'), getUsers);
router.get('/:id', getUser);
router.put(
  '/profile',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('bio')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Bio must be at most 500 characters'),
  ],
  validate,
  updateUser
);
router.put(
  '/password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters'),
  ],
  validate,
  updatePassword
);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
