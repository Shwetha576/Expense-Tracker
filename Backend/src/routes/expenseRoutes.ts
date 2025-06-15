import express from 'express';

import { addExpense, getAllExpense,getExpenseById,updateExpense, deleteExpense, downloadExpenseExcel } from '../controllers/expenseController';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/getall', protect, getAllExpense);
router.get('/getbyid/:id',protect, getExpenseById)
router.put('/update/:id', protect, updateExpense);
router.delete('/delete/:id', protect, deleteExpense);
router.get('/downloadexcel', protect, downloadExpenseExcel);

export default router;