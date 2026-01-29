import express, { Router } from 'express';
import auth, { userRole } from '../../middlewere/auth';

const router = express.Router();


router.get(
  '/',
  auth(userRole.ADMIN),
)

router.get(
  '/:orderId',
)

router.get(
  'seller/:sellerId',
  auth(userRole.SELLLER),
)

router.patch(
  '/:id',
  auth(userRole.SELLLER,userRole.ADMIN),
)

router.delete(
  '/:id',
  auth(userRole.ADMIN),
)




export const userRoute : Router = router;