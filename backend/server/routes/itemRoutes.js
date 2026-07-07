import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../middleware/validate.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getMyItems,
} from '../controllers/itemController.js';

const router = Router();

router.get('/', getItems);
router.get('/mine', protect, getMyItems);
router.get('/:id', getItem);

router.use(protect);

router.post(
  '/',
  [
    body('title')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Title must be between 3 and 100 characters'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a non-negative number'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ],
  validate,
  createItem
);

router.put(
  '/:id',
  [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Title must be between 3 and 100 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a non-negative number'),
  ],
  validate,
  updateItem
);

router.delete('/:id', deleteItem);

export default router;
