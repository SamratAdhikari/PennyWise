"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Hero = () => {
    const { user } = useUser();
    return (
        <section className="bg-gray-50 flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="sm:text-5xl">
                        <span className="text-4xl font-bold">
                            Manage your expenses
                        </span>
                        <strong className="text-6xl font-extrabold text-primary sm:block mt-3">
                            PennyWise
                        </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Manage expenses, save smart, and watch your money grow.
                        Make your money work for you!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {user ? (
                            <a
                                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-950 focus:outline-none focus:ring sm:w-auto"
                                href="/dashboard"
                            >
                                Dashboard
                            </a>
                        ) : (
                            <a
                                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-950 focus:outline-none focus:ring  sm:w-auto"
                                href="/sign-in"
                            >
                                Get Started
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <Image
                src={"/dashboard.png"}
                alt="dashboard-img"
                width={1000}
                height={700}
                className="-mt-10 rounded-xl border-2 mb-10"
            ></Image>
        </section>
    );
};

export default Hero;
