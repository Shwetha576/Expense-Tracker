import XLSX from 'xlsx';
import Income from '../models/Income';
import mongoose, { Document } from 'mongoose';

export const addIncome = async (req, res) => {
    const { source, amount, date, icon } = req.body;
    const userId = req.user._id;
    const incomeId = new mongoose.Types.ObjectId(); // Generate a new ObjectId for the income

    if(!mongoose.Types.ObjectId.isValid(incomeId)) {
        return res.status(400).json({ message: 'Invalid income ID' });
    }
    if (!source || !amount || !date) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const newIncome = new Income({
            userId,
            source,
            amount,
            date: new Date(date), // Ensure date is stored as a Date object
            icon,
            incomeId
        });

        const savedIncome = await newIncome.save();
        res.status(201).json(savedIncome);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

export const getIncomeById = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
    const incomeId = req.params.id;
    try {
        const income = await Income.findById({ _id: incomeId, userId });
        // Check if expense exists
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        const formattedIncome = {
            ...income.toObject(),
            date: income.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        };
        res.json(formattedIncome);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error fetching income', error });
    }
};

export const updatedIncome = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
    const id = req.params.id;
    try {
        const { icon, source, amount, date } = req.body;
        if(!source || !amount || !date){
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const updatedIncome = await Income.findByIdAndUpdate(
            { _id: id, userId },
            { icon, source, amount, date: new Date(date) },
            { new: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.json(updatedIncome);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: 'Income deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting income', error });
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
            Date: new Date(item.date).toLocaleDateString('en-GB'), // Format date to DD/MM/YYYY
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