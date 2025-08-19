import React, { ChangeEvent } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

export interface Income {
    source: string;
    amount: string;
    date: string;
    icon: string;
    id?: string; // Optional for AddIncome, required for EditIncome
}

interface AddIncomeProps {
    onAddIncome: (income: Income) => void;
}

const AddIncomeForm =({onAddIncome}: AddIncomeProps) => {

    const [income, setIncome] = React.useState<Income>({
        source: "",
        amount: "",
        date: "",
        icon: ""
    });

    const handleChange =(key: keyof Income, value: string) =>{ 
        setIncome({...income, [key]: value});
    };


    return (
        <div>

            <EmojiPickerPopup 
                icon={income.icon}
                onSelect={(selectedicon: string) => handleChange("icon", selectedicon)}
            />


            <Input
                value={income.source}
                onChange={({target}: ChangeEvent<HTMLInputElement>) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Enter income source"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({target}: ChangeEvent<HTMLInputElement>) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="Enter amount"
                type="number"
            />
            <Input
                value={income.date}
                onChange={({target}: ChangeEvent<HTMLInputElement>) => handleChange("date", target.value)}
                label="Date"
                placeholder="Enter date"
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm;