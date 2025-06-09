import XLSX from 'xlsx';
import Expense from '../models/Expense';

export const addExpense = async (req, res) => {

    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    try {
        const { icon, category, amount, date } = req.body;
        
        if(!category || !amount || !date){
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const newExpense = new Expense({
            userId,
            icon, // Assuming file upload middleware is used
            category,
            amount,
            date: new Date(date), // Default to current date if not provided
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
};

export const getAllExpense = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }   
};

export const deleteExpense = async (req, res) => {

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting expense' });
    }
};

export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date, // Format date as YYYY-MM-DD
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Expense');
        XLSX.writeFile(wb, 'Expense.xlsx');
        res.download('Expense.xlsx');
    }
    catch(error){
        res.status(500).json({ message: 'Error downloading expense data', error });
    }
};

