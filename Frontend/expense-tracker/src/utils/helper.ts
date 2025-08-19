import moment from "moment";

export const validateEmail = (email: string) => {
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Regex.test(email);
};

export const getInitials = (name: string) => {
    if(!name) return '';
    
    const words = name.split(" ");
    let initials="";

    for(let i=0; i< Math.min(words.length,2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandSeparator = (num: number | null) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionPart
        ? `${formattedInteger}.${fractionPart}`
        : formattedInteger;
};

type ExpenseItem = { category: string; amount: number };
type IncomeItem = { source: string; amount: number };

export const prepareExpenseBarChartData = (data: ExpenseItem[] = []) => {
    const chartData = data.map((item) => ({
        name: item.category,
        amount: item.amount,
    }));
    return chartData;
};

export type IncomeBarChartItem = { date: string; amount: number; source: string };
export type IncomeBarChartData = { month: string; amount: number; source: string };

export const prepareIncomeBarChartData = (data: IncomeBarChartItem[] = []): IncomeBarChartData[] => {
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const chartData = sortedData.map((item) => ({
        month: moment(item.date).format("Do MMM"),
        amount: item.amount,
        source: item.source,
    }));
    return chartData;
};
