"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
    const { user, isSignedIn } = useUser();

    return (
        <div className="p-5 flex justify-between items-center border shadow-md">
            <Image src={"./logo.svg"} alt="logo" width={160} height={100} />
            {isSignedIn ? (
                <UserButton />
            ) : (
                <Link href={"/sign-in"}>
                    <Button>Get started</Button>
                </Link>
            )}
        </div>
    );
};

export default Header;
