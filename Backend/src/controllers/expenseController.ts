import XLSX from 'xlsx';
import Expense from '../models/Expense';
import e from 'express';
import mongoose from 'mongoose';
import { error } from 'console';

export const addExpense = async (req, res) => {
    const { category, amount, date, icon } = req.body;
    const userId = req.user._id;
    const expenseId = new mongoose.Types.ObjectId(); // Generate a new ObjectId for the expense

    if(!mongoose.Types.ObjectId.isValid(expenseId)) {
        return res.status(400).json({ message: 'Invalid expense ID' });
    }
    if (!category || !amount || !date) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const newExpense = new Expense({
            userId,
            category,
            amount,
            date: new Date(date), // Ensure date is stored as a Date object
            icon,
            expenseId
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

export const getExpenseById = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
    const expenseId = req.params.id;
    try {
        const expense = await Expense.findById({ _id: expenseId, userId });
        // Check if expense exists
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        const formattedExpense = {
            ...expense.toObject(),
            date: expense.date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        };
        res.json(formattedExpense);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching expense', error });
    }
};

export const updateExpense = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication
    const id = req.params.id;
    try {
        const { icon, category, amount, date } = req.body;
        if(!category || !amount || !date){
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            { _id: id, userId },
            { icon, category, amount, date: new Date(date) },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteExpense = async (req, res) => {

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting expense', error });
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
            Date: new Date(item.date).toLocaleDateString('en-GB'), // Format date to DD/MM/YYYY
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