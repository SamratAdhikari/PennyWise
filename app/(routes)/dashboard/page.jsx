"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

const Dashboard = () => {
    const { user } = useUser();
    const [budgetList, setBudgetList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        if (user) getBudgetList();
    }, [user]);

    const getBudgetList = async () => {
        const result = await db
            .select({
                ...getTableColumns(Budgets),
                totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${Expenses.id})`.mapWith(Number),
            })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(
                eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)
            )
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));

        setBudgetList(result);
        getAllExpenses();
    };

    const getAllExpenses = async () => {
        const result = await db
            .select({
                id: Expenses.id,
                name: Expenses.name,
                amount: Expenses.amount,
                createdAt: Expenses.createdAt,
            })
            .from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(
                eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress)
            )
            .orderBy(desc(Expenses.id));

        setExpensesList(result);
    };

    return (
        <div className="p-10">
            <h2 className="font-bold text-3xl text-primary">
                Hi, {user?.firstName}
            </h2>
            <p className="text-gray-500">
                Here's whats happening with your money. Lets manage your
                expenses.
            </p>

            <CardInfo budgetList={budgetList} />

            <div className="grid grid-cols-1 lg:grid-cols-3 mt-5 gap-5">
                <div className="lg:col-span-2">
                    <BarChartDashboard budgetList={budgetList} />
                    <div className="mt-8">
                        <ExpenseListTable
                            expensesList={expensesList}
                            refreshData={() => getBudgetList()}
                        />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-xl text-primary">
                        Latest Budgets
                    </h2>
                    {budgetList.length <= 0
                        ? [1, 2, 3].map((_, index) => (
                              <div
                                  key={index}
                                  className="w-full bg-slate-200 rounded-lg h-[165px] animate-pulse my-4"
                              ></div>
                          ))
                        : budgetList.map((budget, index) => (
                              <div key={index} className="my-4">
                                  <BudgetItem budget={budget} />
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
