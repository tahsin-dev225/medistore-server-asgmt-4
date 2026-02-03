import express, { Router } from 'express';
import auth, { userRole } from '../../middlewere/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get(
  '/',
  auth(userRole.ADMIN),
  UserController.getAllUser
)

router.get(
  '/:userId',
  auth(userRole.ADMIN,userRole.CUSTOMER,
     userRole.SELLLER),
    UserController.getUserById
)

router.patch(
  '/admin-status/:userId',
  auth(userRole.ADMIN),
  UserController.adminUpdateUser
)

router.patch(
  "/profile/:userId",
  auth(userRole.CUSTOMER),
  UserController.updateMyProfile

);


router.delete(
  '/:userId',
  auth(userRole.ADMIN),
  UserController.deleteUser
)


export const userRoute : Router = router;