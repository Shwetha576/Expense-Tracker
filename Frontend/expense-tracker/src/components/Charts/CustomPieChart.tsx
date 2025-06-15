import React from "react";
import{
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import CustomTooltip from "../Charts/CustomTooltip";
import CustomLegend from "./CustomLegend";


const CustomPieChart =({data, label, totalAmount, colors, showTextAnchor}) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                {data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
                </Pie>
                <Tooltip content={<CustomTooltip active={true} payload={data} />} />
                <Legend content={<CustomLegend payload={data} />} />

                {showTextAnchor && (
                    <><text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-lg font-semibold text-gray-800"
                    >
                        {label}
                    </text><text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-2xl font-bold text-gray-800"
                    >
                            {totalAmount}
                        </text></>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
}
export default CustomPieChart;