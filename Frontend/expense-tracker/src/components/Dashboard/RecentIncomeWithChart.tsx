import React, { useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { Transaction } from "./ExpenseTransactions";

interface RecentIncomeWithChartProps {
    data: Transaction[];
    totalIncome: number;

}

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart =({data,totalIncome}: RecentIncomeWithChartProps) => {
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={data}
                label="Total Income"
                totalAmount={totalIncome}
                showTextAnchor={true}
                colors={COLORS}
            />
        </div>
    )
};

export default RecentIncomeWithChart;