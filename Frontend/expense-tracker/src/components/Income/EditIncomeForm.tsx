import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { Income } from "./AddIncomeForm";

interface EditIncomeProps {
    income: Income & { id: string }; // This should be the income to edit, with an _id field
    onEditIncome: (income: Income) => void;
}

const EditIncomeForm = (props: EditIncomeProps) => {

    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
        id: "",
    });

    useEffect(() => {

        const fetchedIncome = {
            source: props.income.source || "",
            amount: props.income.amount || "",
            date: props.income.date || "",
            icon: props.income.icon || "",
            id: props.income.id || ""
        };
        setIncome(fetchedIncome);

    }, [props.income]);


    const handleChange =(key: keyof Income, value: string) => {
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
                    onClick={() => props.onEditIncome(income)}
                >
                    Edit Income
                </button>
            </div>
        </div>
    )
}
export default EditIncomeForm;