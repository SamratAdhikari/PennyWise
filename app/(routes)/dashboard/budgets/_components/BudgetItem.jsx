"use client";

import React from "react";
import { rupee } from "@/constants/symbols";
import Link from "next/link";

const BudgetItem = ({ budget }) => {
    if (!budget) return null;

    const calculateProgressPerc = () => {
        // (spend/total) * 100
        const perc = (budget.totalSpend / budget.amount) * 100;
        return perc.toFixed(2);
    };

    return (
        <Link href={"/dashboard/expenses/" + budget.id}>
            <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer">
                <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
                            {budget.icon}
                        </h2>

                        <div>
                            <h2 className="font-bold">{budget.name}</h2>
                            <h2 className="text-sm text-gray-500">
                                {budget.totalItem} Items
                            </h2>
                        </div>
                    </div>
                    <h2 className="font-bold text-primary text-lg">
                        {rupee} {budget.amount}
                    </h2>
                </div>

                <div className="mt-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm text-slate-500">
                            {rupee}
                            {budget.totalSpend ? budget.totalSpend : 0} Spent
                        </h2>
                        <h2 className="text-sm text-slate-500">
                            {rupee}
                            {budget.amount - budget.totalSpend} Remaining
                        </h2>
                    </div>
                    <div className="w-full bg-slate-300 h-2 rounded-full">
                        <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${calculateProgressPerc()}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BudgetItem;
