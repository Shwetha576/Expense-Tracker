import React from "react";
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2
} from "react-icons/lu";

const TransactionInfoCard=({title, icon, date, amount, type, hideDeleteBtn}) => {
    return <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
             <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {icon ? (
                    <img
                        src={icon} alt="icon" className="w-6 h-6" />
                ) : (
                    <LuUtensils/>
                )}
             </div>

             <div className="">
                <div>
                    <p className="">{title}</p>
                    <p className="">{date}</p>
                </div>
             </div>

             <div className="">
                {!hideDeleteBtn && (
                    <button className=""
                        onClick={onDelete}>
                            <LuTrash2 size={18}/>
                    </button>
                )}
             </div>
        </div>
}
export default TransactionInfoCard;