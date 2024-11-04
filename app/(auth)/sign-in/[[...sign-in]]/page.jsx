"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />
                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="#">
                            <span className="sr-only">Home</span>
                            {/* Your home SVG logo */}
                        </a>
                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Squid 🦑
                        </h2>
                        <p className="mt-4 leading-relaxed text-white/90">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Eligendi nam dolorum aliquam, quibusdam
                            aperiam voluptatum.
                        </p>
                    </div>
                </section>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            {/* Mobile logo and welcome message */}
                            {console.log(
                                process.env
                                    .NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL
                            )}
                        </div>
                        <SignIn
                            forceRedirectUrl={
                                process.env
                                    .NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL
                            }
                            onSuccess={() => {
                                window.location.href =
                                    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL;
                            }}
                        />
                    </div>
                </main>
            </div>
        </section>
    );
}
