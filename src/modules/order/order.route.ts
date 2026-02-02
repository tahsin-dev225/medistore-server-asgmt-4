import express, { Router } from 'express';
import { orderControlle } from './order.controller';
import auth, { userRole } from '../../middlewere/auth';

const router = express.Router();


router.get(
  '/',
  auth(userRole.ADMIN),
  orderControlle.getAllOrder
)

router.get(
  '/customer/all',
  auth(userRole.CUSTOMER),
  orderControlle.getCustomerOrder
)

router.get(
  '/:orderId',
  orderControlle.getOrderById
)

router.get(
  '/seller/all',
  auth(userRole.SELLLER),
  orderControlle.getSellerOrder
)

router.patch(
  '/:id',
  auth(userRole.SELLLER,userRole.ADMIN),
  orderControlle.updateOrder
)

router.delete(
  '/:id',
  auth(userRole.ADMIN),
  orderControlle.deleteOrder
)

router.post(
  '/',
  auth(userRole.CUSTOMER),
  orderControlle.createOrder
)




export const orderRoute : Router = router;
