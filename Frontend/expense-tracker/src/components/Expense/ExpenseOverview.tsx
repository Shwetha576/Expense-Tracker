import React, { useEffect } from "react";
import { LuPlus}from "react-icons/lu"
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

type ExpenseBarChartData = { category: string; amount: number };

const ExpenseOverview = ({ transactions, onAddExpense }) => {

    const [chartData, setChartData] = React.useState<ExpenseBarChartData[]>([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return <div className="card">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg">Expense Overview</h5>
                <p className="text-xs text-gray-400 mt-0.5">
                    Track your expenses over time and analyze your spending categories.
                </p>
            </div>

            <button className="add-btn" onClick={onAddExpense}>
                <LuPlus className="text-lg"/>
                Add Expense
            </button>
        </div>
        <div className="mt-10">
            <CustomBarChart data={chartData} />
        </div>
    </div>
};

export default ExpenseOverview;