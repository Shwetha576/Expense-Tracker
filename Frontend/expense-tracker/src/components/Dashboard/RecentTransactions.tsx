import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";


const RecentTransactions =({transactions, onSeeMore}) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between ">
                <div className="text-lg">Recent Transactions</div>
                <button className="card-btn " onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base"/>
                </button>
            </div>
            <div className="mt-6">
                {transactions?.slice(0,5).map((item: { _id: React.Key | null | undefined; type: unknown; category: unknown; source: unknown; icon: unknown; date: moment.MomentInput; amount: unknown; })=>
                    <TransactionInfoCard
                        key={item._id}
                        title={item.type == "expense" ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("DD MM YYYY")}
                        amount={item.amount}
                        type={item.type}
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
