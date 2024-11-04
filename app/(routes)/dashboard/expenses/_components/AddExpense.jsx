import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AddExpense = ({ budgetId, user, refreshData }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const addExpense = async () => {
        setLoading(true);
        const result = await db
            .insert(Expenses)
            .values({
                name: name,
                amount: amount,
                budgetId: budgetId,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ insertedId: Budgets.id });

        setName("");
        setAmount("");

        if (result) {
            refreshData();
            toast.success("Expense addded!");
        } else {
            toast.error("Unable to add the expense!");
        }
        setLoading(false);
    };

    return (
        <div className="border p-5 rounded-lg">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                    placeholder="eg. Clothes"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                    placeholder="eg. 5000"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
            </div>
            <Button
                disabled={!(name && amount)}
                className="mt-3 w-full"
                onClick={() => addExpense()}
            >
                {loading ? <Loader className="animate-spin" /> : "Add expense"}
            </Button>
        </div>
    );
};

export default AddExpense;
