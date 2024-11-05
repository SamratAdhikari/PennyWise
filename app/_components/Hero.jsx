"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Hero = () => {
    const { user } = useUser();
    return (
        <section className="bg-gray-50 flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-24 lg:py-32 flex flex-col lg:flex-row lg:items-center">
                <div className="mx-auto max-w-xl text-center lg:text-center">
                    <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                        <span className="block">Manage your expenses</span>
                        <strong className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary sm:block mt-3">
                            PennyWise
                        </strong>
                    </h1>

                    <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed">
                        Manage expenses, save smart, and watch your money grow.
                        Make your money work for you!
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        {user ? (
                            <a
                                className="block w-full sm:w-auto rounded bg-primary px-8 py-3 text-sm font-medium text-white shadow hover:bg-blue-950 focus:outline-none focus:ring"
                                href="/dashboard"
                            >
                                Dashboard
                            </a>
                        ) : (
                            <a
                                className="block w-full sm:w-auto rounded bg-primary px-8 py-3 text-sm font-medium text-white shadow hover:bg-blue-950 focus:outline-none focus:ring"
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
                className="w-full max-w-lg lg:max-w-none lg:w-[1000px] h-auto -mt-10 rounded-xl border-2 mb-10"
            />
        </section>
    );
};

export default Hero;
