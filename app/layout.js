import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const font = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

export const metadata = {
    title: "PennyWise",
    description: "Expense Tracker app",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <html lang="en">
                <body className={`${font.className} antialiased`}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
