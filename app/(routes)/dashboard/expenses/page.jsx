"use client";

import React, { useState, useEffect } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";

const ExpensesPage = () => {
    const [expensesList, setExpensesList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        const result = await db.select().from(Expenses);
        setExpensesList(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const refreshData = () => {
        setLoading(true);
        fetchExpenses();
    };

    return (
        <div className="m-10 border rounded-lg p-5">
            <ExpenseListTable
                expensesList={expensesList}
                refreshData={refreshData}
            />
        </div>
    );
};

export default ExpensesPage;
