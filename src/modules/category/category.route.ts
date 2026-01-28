import express, { Router } from 'express';
import { categoryController } from './category.controller';
import auth, { userRole } from '../../middlewere/auth';

const router = express.Router();

router.get(
  '/', 
  auth(userRole.ADMIN),
  categoryController.getAllCategory
)

router.delete(
  '/', 
  auth(userRole.ADMIN),
  categoryController.deleteCategory
)

router.post(
  '/', 
  auth(userRole.ADMIN),
  categoryController.createCategory
)


export const categoryRoute : Router = router;
