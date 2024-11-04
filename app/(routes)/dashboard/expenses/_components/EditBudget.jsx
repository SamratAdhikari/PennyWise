"use client";

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

const EditBudget = ({ budgetInfo, refreshData }) => {
    if (!budgetInfo) {
        return null;
    }

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);

    const onUpdateBudget = async () => {
        const result = await db
            .update(Budgets)
            .set({
                name: name,
                amount: amount,
                icon: emojiIcon,
            })
            .where(eq(Budgets.id, budgetInfo.id))
            .returning();

        if (result) {
            refreshData();
            toast.success("Budget details updated!");
        } else {
            toast.error("Unable to update the budget details!");
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PenBox />
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update budget details</DialogTitle>
                        <DialogDescription></DialogDescription>
                        <div className="mt-5">
                            <Button
                                className="text-lg"
                                size="lg"
                                variant="outline"
                                onClick={() =>
                                    setOpenEmojiPicker(!openEmojiPicker)
                                }
                            >
                                {emojiIcon}
                            </Button>
                            <div className="absolute z-10">
                                <EmojiPicker
                                    open={openEmojiPicker}
                                    onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji);
                                        setOpenEmojiPicker(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <h2 className="text-black font-medium my-1">
                                    Budget Name
                                </h2>
                                <Input
                                    placeholder="eg. Salary"
                                    onChange={(e) => setName(e.target.value)}
                                    defaultValue={budgetInfo.name}
                                />
                            </div>

                            <div className="mt-2">
                                <h2 className="text-black font-medium my-1">
                                    Budget Amount
                                </h2>
                                <Input
                                    type="number"
                                    placeholder="eg. 15000"
                                    onChange={(e) => setAmount(e.target.value)}
                                    defaultValue={budgetInfo.amount}
                                />
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                className="mt-5 w-full"
                                onClick={() => onUpdateBudget()}
                            >
                                Update
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditBudget;
