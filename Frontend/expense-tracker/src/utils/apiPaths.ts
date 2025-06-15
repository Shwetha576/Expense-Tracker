export const BASE_URL = 'http://localhost:8000';

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getuser",
    },
    DASHBOARD: { 
        GET_DATA: "/api/v1/dashboard",
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_BY_ID: (income: any) => `/api/v1/income/getbyid/${income}`,
        UPDATE_INCOME: (income: any) => `/api/v1/income/update/${income}`,
        GET_ALL_INCOMES: "/api/v1/income/getall",
        DELETE_INCOME: (income: any) => `/api/v1/income/delete/${income}`,
        DOWNLOAD_INCOME: "api/v1/income/downloadexcel",
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_BY_ID: (expense: any) => `/api/v1/expense/getbyid/${expense}`,
        UPDATE_EXPENSE: (expense: any) => `/api/v1/expense/update/${expense}`,
        GET_ALL_EXPENSES: "/api/v1/expense/getall",
        DELETE_EXPENSE: (expense: any) => `/api/v1/expense/delete/${expense}`,
        DOWNLOAD_EXPENSE: "api/v1/expense/downloadexcel",
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    },
}