"use client";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const ExpensesScreen = ({ params: paramsPromise }) => {
    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [params, setParams] = useState(null);
    const [expensesList, setExpensesList] = useState();
    const route = useRouter();

    // Unwrapping the params promise and setting it to state
    useEffect(() => {
        paramsPromise.then((unwrappedParams) => setParams(unwrappedParams));
    }, [paramsPromise]);

    useEffect(() => {
        // Only fetch budget info if both user and params are defined
        if (user && params) {
            getBudgetInfo();
        }
    }, [user, params]);

    const getBudgetInfo = async () => {
        if (!params?.id) return; // Ensure params.id exists

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
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
        getExpensesList();
    };

    const getExpensesList = async () => {
        const result = await db
            .select()
            .from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id));

        setExpensesList(result);
    };

    const deleteBudget = async () => {
        const deleteExpenses = await db
            .delete(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .returning();

        if (deleteExpenses) {
            const result = await db
                .delete(Budgets)
                .where(eq(Budgets.id, params.id))
                .returning();

            if (result) {
                route.push("/dashboard/budgets");
                toast.success("Budget deleted!");
            } else {
                toast.error("Unable to delete the budget!");
            }
        }
    };

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold flex justify-between items-center text-primary">
                <span className="flex gap-2 items-center">
                    <ArrowLeft
                        onClick={() => route.back()}
                        className="cursor-pointer"
                    />
                    Expenses
                </span>
                <div className="flex gap-2 items-center">
                    <EditBudget
                        budgetInfo={budgetInfo}
                        refreshData={() => getBudgetInfo()}
                    />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="flex gap-2"
                                variant="destructive"
                            >
                                <Trash2 />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your current budget along
                                    with its expenses.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="hover:bg-red-600"
                                    onClick={() => deleteBudget()}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="h-[165px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
                )}
                {/* Ensure params is loaded before passing it to AddExpense */}
                {params && (
                    <AddExpense
                        budgetId={params.id}
                        user={user}
                        refreshData={() => getBudgetInfo()}
                    />
                )}
            </div>
            <div className="mt-4">
                <ExpenseListTable
                    expensesList={expensesList}
                    refreshData={() => getBudgetInfo()}
                />
            </div>
        </div>
    );
};

export default ExpensesScreen;
