import { useEffect, useState } from "react";
import { LuPlus}from "react-icons/lu"
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { IncomeBarChartData, IncomeBarChartItem, prepareIncomeBarChartData } from "../../utils/helper";
import { Transaction } from "../Dashboard/ExpenseTransactions";

interface IncomeOverviewProps {
    transactions: Transaction[];
    onAddIncome: () => void;
}

const IncomeOverview = ({ transactions, onAddIncome }: IncomeOverviewProps) => {

    const [chartData, setChartData] = useState<IncomeBarChartData[]>([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return <div className="card">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg">Income Overview</h5>
                <p className="text-xs text-gray-400 mt-0.5">
                    Track your earnings over time and analyze your income sources.
                </p>
            </div>

            <button className="add-btn" onClick={onAddIncome}>
                <LuPlus className="text-lg"/>
                Add Income
            </button>
        </div>
        <div className="mt-10">
            <CustomBarChart data={transactions} />
        </div>
    </div>
};

export default IncomeOverview;