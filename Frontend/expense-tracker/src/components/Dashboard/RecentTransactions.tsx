import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { Transaction } from "./ExpenseTransactions";

interface RecentTransactionsProps {
    transactions: Transaction[];
    onSeeMore: () => void;
}

const RecentTransactions =({transactions, onSeeMore}: RecentTransactionsProps) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between ">
                <div className="text-lg">Recent Transactions</div>
                <button className="card-btn " onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base"/>
                </button>
            </div>
            <div className="mt-6">
                {transactions?.slice(0,5).map(transaction =>
                    <TransactionInfoCard
                        key={transaction._id}
                        title={transaction.type == "expense" ? transaction.category : transaction.source}
                        icon={transaction.icon}
                        date={moment(transaction.date).format("DD MM YYYY")}
                        amount={transaction.amount}
                        type={transaction.type as "income" | "expense"}
                        onDelete={undefined}
                        hideEditBtn={undefined}
                        onEdit={undefined}
                        hideDeleteBtn={undefined}                    />
                )}
            </div>
        </div>
    )
}

export default RecentTransactions;
