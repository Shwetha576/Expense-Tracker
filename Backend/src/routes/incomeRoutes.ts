import express from 'express';

import { addIncome, getAllIncome,getIncomeById,updatedIncome, deleteIncome, downloadIncomeExcel } from '../controllers/incomeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/getall', protect, getAllIncome);
router.get('/getbyid/:id', protect, getIncomeById);
router.put('/update/:id', protect, updatedIncome);
router.delete('/delete/:id', protect, deleteIncome);
router.get('/downloadexcel', protect, downloadIncomeExcel);

export default router;