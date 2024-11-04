"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptIcon, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Budgets",
            icon: PiggyBank,
            path: "/dashboard/budgets",
        },
        {
            id: 3,
            name: "Expenses",
            icon: ReceiptIcon,
            path: "/dashboard/expenses",
        },

        {
            id: 4,
            name: "Upgrade",
            icon: ShieldCheck,
            path: "/dashboard/upgrade",
        },
    ];

    const path = usePathname();
    const { user } = useUser();

    return (
        <div className="h-screen p-5 shadow-md border">
            <div className="flex items-center">
                <Link href={"/"}>
                    <span className="text-3xl text-blue-950 font-extrabold">
                        PennyWise
                    </span>
                </Link>
            </div>
            <div className="mt-5">
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={menu.id}>
                        <h2
                            className={`flex gap-2 items-center text-gray-500 font-semibold p-5 mb-2 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 
                            ${path == menu.path && "text-primary bg-blue-100"}`}
                        >
                            <menu.icon />
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>

            <div className="fixed bottom-10 p-5 flex gap-2 items-center font-semibold">
                <UserButton />
                {user?.fullName}
            </div>
        </div>
    );
};

export default SideNav;
