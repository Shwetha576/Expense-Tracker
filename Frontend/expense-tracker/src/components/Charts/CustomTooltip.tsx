import { Transaction } from "../Dashboard/ExpenseTransactions";

interface CustomTooltipProps {
    active?: boolean;
    payload: Transaction[];
}

const CustomTooltip =({active, payload}: CustomTooltipProps) =>{
    if(active && payload && payload.length) {
        return(
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-purple-800 mb-1">
                    {payload[0].source} - {payload[0].category}
                </p>
                <p className="text-sm text-gray-600">
                    Amount: <span className="text-sm font-medium text-gray-900">
                        ₹{payload[0].amount}</span>
                </p>
            </div>
        )
    }
    return null;
}
export default CustomTooltip;