import React, { ChangeEvent, useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

export interface Expense {
    category: string;
    amount: string;
    date: string;
    icon: string;
    id?: string; // Optional for AddExpense, required for EditExpense
}

interface AddExpenseProps {
    onAddExpense: (expense: Expense) => void;
}

const AddExpenseForm =({onAddExpense}: AddExpenseProps) => {

    const [expense, setExpense] = useState<Expense>({
        category: "",
        amount: "",
        date: "",
        icon: ""
    });

    const handleChange = (key: keyof Expense, value: string) => {
        return setExpense({ ...expense, [key]: value });
    };


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
                    onClick={() => onAddExpense(expense)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    )
}
export default AddExpenseForm;