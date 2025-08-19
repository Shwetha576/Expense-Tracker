import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { Transaction } from "../Dashboard/ExpenseTransactions";

interface IncomeListProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
    onDownload: () => void;
    onEdit: (income: Transaction) => void;
}

const IncomeList =({ transactions, onDelete, onDownload , onEdit }: IncomeListProps) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>
                
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((income: Transaction) => (
                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        date={moment(income.date).format("DD MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                        hideDeleteBtn={true}
                        hideEditBtn={true}
                        onEdit={() => onEdit(income)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;