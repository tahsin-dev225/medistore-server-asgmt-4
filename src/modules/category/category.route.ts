import express, { Router } from 'express';
import { categoryController } from './category.controller';
import auth, { userRole } from '../../middlewere/auth';

const router = express.Router();

router.get(
  '/',
  categoryController.getAllCategory
)

router.delete(
  '/:categoryId', 
  auth(userRole.ADMIN),
  categoryController.deleteCategory
)

router.post(
  '/', 
  auth(userRole.ADMIN),
  categoryController.createCategory
)


export const categoryRoute : Router = router;
