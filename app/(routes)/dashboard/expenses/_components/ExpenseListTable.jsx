import { rupee } from "@/constants/symbols";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expensesList, refreshData }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (expensesList) {
            setLoading(false);
        }
    }, [expensesList]);

    const deleteExpense = async (expense) => {
        const result = await db
            .delete(Expenses)
            .where(eq(Expenses.id, expense.id))
            .returning();

        if (result) {
            refreshData();
            toast.success("Expense deleted!");
        } else {
            toast.error("Unable to delete the expense!");
        }
    };

    return (
        <div className="mt-3">
            <h2 className="font-bold text-xl text-primary mb-4">
                Expense List
            </h2>
            <div className="grid grid-cols-4 bg-slate-200 p-2 font-semibold">
                <h2>Name</h2>
                <h2>Amount ({rupee})</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>
            {loading
                ? // Render the skeleton loader when loading
                  [1, 2, 3, 4, 5].map((_, index) => (
                      <div
                          key={index}
                          className="grid grid-cols-4 bg-slate-100 p-2 animate-pulse"
                      >
                          <div className="h-5 bg-slate-300 rounded col-span-1" />
                          <div className="h-5 bg-slate-300 rounded col-span-1" />
                          <div className="h-5 bg-slate-300 rounded col-span-1" />
                          <div className="h-5 bg-slate-300 rounded col-span-1" />
                      </div>
                  ))
                : // Render the actual data once it has loaded
                  expensesList.map((expense, index) => (
                      <div
                          key={index}
                          className="grid grid-cols-4 bg-slate-50 p-2"
                      >
                          <h2>{expense.name}</h2>
                          <h2>{expense.amount}</h2>
                          <h2>
                              {new Date(expense.createdAt).toLocaleDateString()}
                          </h2>{" "}
                          {/* Format the Date */}
                          <h2>
                              <Trash
                                  className="text-primary hover:text-red-600 cursor-pointer"
                                  onClick={() => deleteExpense(expense)}
                              />
                          </h2>
                      </div>
                  ))}
        </div>
    );
};

export default ExpenseListTable;
