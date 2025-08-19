import { LuPlus}from "react-icons/lu"
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { Transaction } from "../Dashboard/ExpenseTransactions";

interface ExpenseOverviewProps {
    transactions: Transaction[];
    onAddExpense: () => void;
}

const ExpenseOverview = ({ transactions, onAddExpense }: ExpenseOverviewProps) => {
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
            <CustomBarChart data={transactions} />
        </div>
    </div>
};

export default ExpenseOverview;