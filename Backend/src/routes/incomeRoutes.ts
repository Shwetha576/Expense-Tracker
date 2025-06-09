import express from 'express';

import { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } from '../controllers/incomeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncome);
router.delete('/:id', protect, deleteIncome);
router.get('/downloadexcel', protect, downloadIncomeExcel);

export default router;