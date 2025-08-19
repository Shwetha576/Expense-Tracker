import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

interface ExpenseTransactionsProps {
    transactions: Transaction[];
    onSeeMore: () => void;
}

export interface Transaction {
        type: string;
        _id: string;
        category: string;
        source: string
        icon?: string;
        date: string;
        amount: number;
    }

const ExpenseTransactions =({transactions, onSeeMore}: ExpenseTransactionsProps) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expense</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5).map((expense) => (                  
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}  
                        icon={expense.icon}
                        date={moment(expense.date).format("MMM DD, YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={undefined}
                        hideEditBtn={undefined}
                        onEdit={undefined}
                        hideDeleteBtn={undefined}
                    />
                ))}
            </div>
        </div>
    )
};

export default ExpenseTransactions; 