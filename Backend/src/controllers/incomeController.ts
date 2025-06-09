import XLSX from 'xlsx';
import Income from '../models/Income';

export const addIncome = async (req, res) => {

    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    try {
        const { icon, source, amount, date } = req.body;
        
        if(!source || !amount || !date){
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const newIncome = new Income({
            userId,
            icon, // Assuming file upload middleware is used
            source,
            amount,
            date: new Date(date), // Default to current date if not provided
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Error adding income', error });
    }
};

export const getAllIncome = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }   
};

export const deleteIncome = async (req, res) => {

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: 'Income deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting income' });
    }
};

export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    try{
        const income = await Income.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date, // Format date as YYYY-MM-DD
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Income');
        XLSX.writeFile(wb, 'Income.xlsx');
        res.download('Income.xlsx');
    }
    catch(error){
        res.status(500).json({ message: 'Error downloading income data', error });
    }
};