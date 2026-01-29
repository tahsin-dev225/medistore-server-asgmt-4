import express, { Router } from 'express';
import { MedicineControlle } from './medicine.controller';
import auth, { userRole } from '../../middlewere/auth';

const router = express.Router();


router.get(
  '/',  
  MedicineControlle.getAllMedicines
)

router.get(
  '/:medicineId',
  MedicineControlle.getMedicineId
)

router.get(
  '/seller/all',
  auth(userRole.SELLLER),
  MedicineControlle.getSellerMedicines
)

router.patch(
  '/:id',
  auth(userRole.SELLLER,userRole.ADMIN),
  MedicineControlle.updateMedicine
)

router.delete(
  '/:id',
  auth(userRole.SELLLER,userRole.ADMIN),
  MedicineControlle.deleteMedicine
)

router.post(
  '/',
  auth(userRole.SELLLER),
  MedicineControlle.createMedicine
)




export const medicineRoute : Router = router;
