import express, { Router } from 'express';
import { MedicineControlle } from './medicine.controller';

const router = express.Router();

router.post(
  '/', 
  MedicineControlle.createMedicine
)


export const medicineRoute : Router = router;
