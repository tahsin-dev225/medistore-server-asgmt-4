import express, { Router } from 'express';
import { MedicineControlle } from './medicine.controller';
import auth, { userRole } from '../../middlewere/auth';

const router = express.Router();


router.get(
  '/',  
  MedicineControlle.getAllMedicines
)

router.post(
  '/',
  auth(userRole.SELLLER),
  MedicineControlle.createMedicine
)




export const medicineRoute : Router = router;
