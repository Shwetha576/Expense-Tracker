import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import EditExpenseForm from "../../components/Expense/EditExpenseForm";
import DeleteAlert from "../../components/DeleteAlert";
import useUserAuth from "../../hooks/useUserAuth";
import ExpenseList from "../../components/Expense/ExpenseList";

const Expense = () => {

  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    show: boolean;
    data: any | null;
  }>({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openEditExpenseModal, setOpenEditExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({
    id: "",
    category: "",
    amount: "",
    date: "",
    icon: "",
  });


  const fetchExpenseData = async () => {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSES}`);

      if (response.data) {
        setExpenseData(response.data);
      }
    }
    catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense: any) => {
    const { category, amount, date, icon } = expense;

    if(!category.trim()) {
      toast.error("Expense category is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0");
      return;
    }

    if(!date) {
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseData();
    }
    catch (error: any) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
    
  };


function getExpenseById(expenseId: any) {
    axiosInstance.get(API_PATHS.EXPENSE.GET_BY_ID(expenseId))
      .then((response) => {
        setSelectedExpense(response.data);
        setOpenEditExpenseModal(true);
      }
      )
      .catch((error) => {
        console.error(
          "Error fetching expense by ID:",
          error.response?.data?.message || error.message
        );
        toast.error("Failed to fetch expense details");
      }
      );
  };  


  const handleEditExpense = async (expense: any) => {
    const { category, amount, date, icon } = expense;
    if(!category.trim()) {
      toast.error("Expense category is required");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0");
      return;
    }
    if(!date) {
      toast.error("Date is required");
      return;
    }
    try {
      axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(expense.id), {
        category,
        amount,
        date,
        icon
      });
      setOpenEditExpenseModal(false);
      toast.success("Expense updated successfully");
      fetchExpenseData();
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  const deleteExpense = async (expense: any) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(expense.id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseData();
    }
    catch (error: any) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete expense");
    }
  };


  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully");
    } catch (error: any) {
      console.error("Error downloading expense details:", error.response?.data?.message || error.message);
      toast.error("Failed to download expense details");
    }
  };


  useEffect(() => {
    fetchExpenseData();

    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onEdit={(expenseId: any) => {
              getExpenseById(expenseId);
            }}
            onDelete={(id: any) => {
              setOpenDeleteAlert({
                show: true,
                data: { id },
              });
            }}
            onDownload={handleDownloadExpenseDetails}

          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openEditExpenseModal}
          onClose={() => setOpenEditExpenseModal(false)}
          title="Edit Expense"
        >
          <EditExpenseForm onEditExpense={handleEditExpense} expense={selectedExpense} />
        </Modal>

        
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense;
