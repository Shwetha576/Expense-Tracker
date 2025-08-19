import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import axiosInstance from "../../utils/axiosInstance";
import { Expense } from "./AddExpenseForm";


interface EditExpenseProps {
    expense: Expense & { id: string }; // This should be the expense to edit, with an _id field
    onEditExpense: (expense: Expense) => void;
}

const EditExpenseForm = (props: EditExpenseProps) => {

    const [expense, setExpense] = useState<Expense>({
        category: "",
        amount: "",
        date: "",
        icon: "",
        id: "",
    });

    useEffect(() => {
        
        const fetchedExpense = {
            category: props.expense.category || "",
            amount: props.expense.amount || "",
            date: props.expense.date || "",
            icon: props.expense.icon || "",
            id: props.expense.id || ""
        };
        setExpense(fetchedExpense);

    }, [props.expense]);


    const handleChange =(key: keyof Expense, value: string) => setExpense({...expense, [key]: value});


    return (
        <div>

            <EmojiPickerPopup 
                icon={expense.icon}
                onSelect={(selectedicon: string) => handleChange("icon", selectedicon)}
            />

            <Input
                value={expense.category}
                onChange={({target}: ChangeEvent<HTMLInputElement>) => handleChange("category", target.value)}
                label="Expense Category"
                placeholder="Enter expense category"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({target}: ChangeEvent<HTMLInputElement>) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="Enter amount"
                type="number"
            />
            <Input
                value={expense.date}
                onChange={({target}: ChangeEvent<HTMLInputElement>) => handleChange("date", target.value)}
                label="Date"
                placeholder="Enter date"
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => props.onEditExpense(expense)}
                >
                    Edit Expense
                </button>
            </div>
        </div>
    )
}
export default EditExpenseForm;