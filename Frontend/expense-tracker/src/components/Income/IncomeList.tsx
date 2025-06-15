import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList =({ transactions, onDelete, onDownload , onEdit }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Sources</h5>
                
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((income: { _id: React.Key; source: unknown; icon: unknown; date: moment.MomentInput; amount: unknown; }) => (
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