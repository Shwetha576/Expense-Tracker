import React from "react";
import { 
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
 } from 'recharts';
import CustomTooltip from "./CustomTooltip";


const CustomBarChart = ({ data }) => {
    
    const getBarColor = (index) => {
        return index % 2 === 0 ? '#875cf5' : '#cfbefb';
    };

    const CustomTooltip = ({ active, payload }) => {
        if(active && payload && payload.length){
            return(
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-sm font-medium text-gray-900">₹{payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }
        return null;
    };

    return(
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 12 }} stroke="none" />
                    <YAxis tick={{ fill: '#555', fontSize: 12 }} stroke="none" />

                    <Tooltip content={<CustomTooltip active={true} payload={data} />} />

                    <Bar
                        dataKey="amount"
                        fill="#FF8042"
                        radius={[10, 10, 0, 0]}
                    >
                        {data.map((entry, index) => (
                           <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
};

export default CustomBarChart;