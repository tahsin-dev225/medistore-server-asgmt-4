import express, { Router } from 'express';
import { reviewController } from './review.controller';
import auth, { userRole } from '../../middlewere/auth';

const router = express.Router();

router.get(
  '/',
  reviewController.getAllReview
)

router.delete(
  '/:reviewId', 
  auth(userRole.ADMIN,userRole.CUSTOMER),
  reviewController.deleteReview
)

router.post(
  '/', 
  auth(userRole.CUSTOMER),
  reviewController.createReview
)


export const reviewRoute : Router = router;
