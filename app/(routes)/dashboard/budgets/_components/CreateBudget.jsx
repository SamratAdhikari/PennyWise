"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";

const CreateBudget = ({ refreshData }) => {
    const [emojiIcon, setEmojiIcon] = useState("😊");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const { user } = useUser();

    const onCreateBudget = async () => {
        const result = await db
            .insert(Budgets)
            .values({
                name: name,
                amount: amount,
                createdBy: user?.primaryEmailAddress.emailAddress,
                icon: emojiIcon,
            })
            .returning({ insertedId: Budgets.id });

        if (result) {
            refreshData();
            toast.success("Budget created!");
        } else {
            toast.error("Unable to create budget!");
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="bg-slate-100 p-12 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
                        <span className="text-3xl">+</span>
                        <span className="text-lg">Create new budget</span>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new budget</DialogTitle>
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
                                />
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                className="mt-5 w-full"
                                onClick={() => onCreateBudget()}
                            >
                                Create Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateBudget;
