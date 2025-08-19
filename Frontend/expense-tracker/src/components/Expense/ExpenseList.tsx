import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { Transaction } from "../Dashboard/ExpenseTransactions";

interface ExpenseListProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
    onDownload: () => void;
    onEdit: (id: string) => void;
}

const ExpenseList =({ transactions, onDelete, onDownload, onEdit }: ExpenseListProps) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expense Categories</h5>

                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((expense: Transaction) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("DD MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense._id)}
                        hideDeleteBtn={true}
                        hideEditBtn={true}
                        onEdit={() => onEdit(expense._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList;