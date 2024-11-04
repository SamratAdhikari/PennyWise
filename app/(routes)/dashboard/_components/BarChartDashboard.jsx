import React from "react";
import {
    Bar,
    BarChart,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

const BarChartDashboard = ({ budgetList }) => {
    if (budgetList.length === 0) {
        // Skeleton for loading state
        return (
            <div className="border rounded-lg p-5 animate-pulse">
                <h2 className="font-semibold text-lg mb-4">Activity</h2>
                <div className="w-full h-[400px] flex items-center justify-center space-x-2">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="w-10 h-32 bg-slate-200 rounded"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="border rounded-lg p-5">
            <h2 className="font-semibold text-lg mb-4">Activity</h2>
            <ResponsiveContainer
                width="100%"
                height={400}
                className="sm:w-full md:w-[500px] lg:w-[700px]"
            >
                <BarChart data={budgetList}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalSpend" stackId="a" fill="#262577" />
                    <Bar dataKey="amount" stackId="a" fill="#8f8df7" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartDashboard;
