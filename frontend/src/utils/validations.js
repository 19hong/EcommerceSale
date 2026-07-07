import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const itemSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required'),
  price: z
    .string()
    .or(z.number())
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: 'Price must be a non-negative number',
    }),
  category: z
    .string()
    .min(1, 'Category is required'),
  status: z.enum(['active', 'inactive', 'archived']).optional(),
});

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  phone: z.string().optional(),
  bio: z
    .string()
    .max(500, 'Bio must be at most 500 characters')
    .optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: z
      .string()
      .min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });
