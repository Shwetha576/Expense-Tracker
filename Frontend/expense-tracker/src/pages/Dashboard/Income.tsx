import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import DeleteAlert from "../../components/DeleteAlert";
import useUserAuth from "../../hooks/useUserAuth";
import IncomeOverview from "../../components/Income/IncomeOverview";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import EditIncomeForm from "../../components/Income/EditIncomeForm";
import IncomeList from "../../components/Income/IncomeList";


const Income = () => {

  useUserAuth();

  const [incomeData, setIncomeData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    show: boolean;
    data: any | null;
  }>({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = React.useState(false);
  const [openEditIncomeModal, setOpenEditIncomeModal] = React.useState(false);
  const [selectedIncome, setSelectedIncome] = React.useState({
    id: "",
    source: "",
    amount: "",
    date: "",
    icon: "",
  });


  const fetchIncomeData = async () => {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOMES}`);

      if (response.data) {
        setIncomeData(response.data);
      }
    }
    catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income: any) => {
    const { source, amount, date, icon } = income;

    if(!source.trim()) {
      toast.error("Income source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeData();
    }
    catch (error: any) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
    
  };


function getIncomeById(incomeId: any) {
    axiosInstance.get(API_PATHS.INCOME.GET_BY_ID(incomeId._id))
      .then((response) => {
        setSelectedIncome(response.data);
        setOpenEditIncomeModal(true);
      }
      )
      .catch((error) => {
        console.error(
          "Error fetching income by ID:",
          error.response?.data?.message || error.message
        );
        toast.error("Failed to fetch income details");
      }
      );
  };  


  const handleEditIncome = async (income: any) => {
    const { source, amount, date, icon } = income;
    if(!source.trim()) {
      toast.error("Income source is required");
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
      axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(income.id), {
        source,
        amount,
        date,
        icon
      });
      setOpenEditIncomeModal(false);
      toast.success("Income updated successfully");
      fetchIncomeData();
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  const deleteIncome = async (income: any) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(income.id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeData();
    }
    catch (error: any) {
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
      toast.error("Failed to delete income");
    }
  };


  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully");
    } catch (error: any) {
      console.error("Error downloading income details:", error.response?.data?.message || error.message);
      toast.error("Failed to download income details");
    }
  };


  useEffect(() => {
    fetchIncomeData();
  }, []);


  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onEdit={(incomeId: any) => {
              getIncomeById(incomeId);
            }}
            onDelete={(id: any) => {
              setOpenDeleteAlert({
                show: true,
                data: { id },
              });
            }}
            onDownload={handleDownloadIncomeDetails}

          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openEditIncomeModal}
          onClose={() => setOpenEditIncomeModal(false)}
          title="Edit Income"
        >
          <EditIncomeForm onEditIncome={handleEditIncome} income={selectedIncome} />
        </Modal>

        
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
