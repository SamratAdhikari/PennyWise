"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
    const { user } = useUser();
    return (
        <div className="p-5 shadow-sm border-b font-medium flex justify-between">
            <div></div>
            <div>
                {user ? (
                    <UserButton />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;
