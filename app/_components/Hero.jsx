import Image from "next/image";
import React from "react";

const Hero = () => {
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
                        <a
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-950 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="/sign-in"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>

            <Image
                src={"/dashboard.jpg"}
                alt="dashboard-img"
                width={1000}
                height={700}
                className="-mt-10 rounded-xl border-2"
            ></Image>
        </section>
    );
};

export default Hero;
