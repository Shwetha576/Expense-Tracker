import { Transaction } from "../Dashboard/ExpenseTransactions";

interface CustomLegendProps {
    payload: Transaction[];
}

const CustomLegend =({payload}: CustomLegendProps) =>{
    return (
        <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
            {payload.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center space-x-2">
                    <div
                        className="w-2.5 h-3 rounded-full"
                        style={{backgroundColor: "#8884d8"}}
                    ></div>

                    <span className="text-sm text-gray-700 font-medium">
                        {entry.source} - ₹{entry.amount}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default CustomLegend;