import { rupee } from "@/constants/symbols";
import getFinancialAdvice from "@/utils/getFinancialAdvice";
import { PiggyBank, ReceiptText, Sparkles, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

const CardInfo = ({ budgetList }) => {
    if (!budgetList) {
        return;
    }

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
    const [financialAdvice, setFinancialAdvice] = useState("");

    useEffect(() => {
        budgetList && calcCardInfo();
    }, [budgetList]);

    useEffect(() => {
        if (totalBudget > 0 || totalSpend > 0) {
            const fetchFinancialAdvice = async () => {
                const advice = await getFinancialAdvice(
                    totalBudget,
                    totalSpend
                );
                setFinancialAdvice(advice);
            };

            fetchFinancialAdvice();
        }
    }, [totalBudget, totalSpend]);

    const calcCardInfo = () => {
        let totalBudget_ = 0;
        let totalSpend_ = 0;
        budgetList.forEach((element) => {
            totalBudget_ = totalBudget_ + Number(element.amount);
            totalSpend_ = totalSpend_ + Number(element.totalSpend);
        });

        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
    };

    return (
        <div>
            {budgetList?.length > 0 && financialAdvice ? (
                <div>
                    {/* Cards */}
                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="p-7 border rounded-lg flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Total Budget</h2>
                                <h2 className="font-bold text-2xl">
                                    {rupee} {totalBudget}
                                </h2>
                            </div>
                            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
                        </div>

                        <div className="p-7 border rounded-lg flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Total Spent</h2>
                                <h2 className="font-bold text-2xl">
                                    {rupee} {totalSpend}
                                </h2>
                            </div>
                            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
                        </div>

                        <div className="p-7 border rounded-lg flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">No. of Budgets</h2>
                                <h2 className="font-bold text-2xl">
                                    {budgetList.length}
                                </h2>
                            </div>
                            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
                        </div>
                    </div>

                    {/* AI */}
                    <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
                        <div className="">
                            <div className="flex mb-2 flex-row space-x-1 items-center">
                                <Sparkles className="rounded-full text-white w-10 h-10 mr-2 p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate" />
                                <h2 className="text-md font-semibold">
                                    PennyWise
                                </h2>
                            </div>
                            <h2 className="font-light text-md">
                                {financialAdvice ||
                                    "Loading financial advice..."}
                            </h2>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3].map((_, index) => (
                            <div
                                key={index}
                                className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
                            ></div>
                        ))}
                    </div>

                    <div>
                        <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
                            <div className="w-full">
                                <div className="flex mb-2 flex-row items-center space-x-2 animate-pulse">
                                    {/* Skeleton for Sparkles Icon */}
                                    <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                    {/* Skeleton for PennyWise Text */}
                                    <div className="h-5 w-24 bg-slate-200 rounded-md"></div>
                                </div>
                                {/* Skeleton lines for financial advice text */}
                                <div className="mt-3 grid grid-cols-1 gap-2">
                                    {[1, 2].map((_, index) => (
                                        <div
                                            key={index}
                                            className="h-4 w-full bg-slate-200 animate-pulse rounded-lg"
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardInfo;
