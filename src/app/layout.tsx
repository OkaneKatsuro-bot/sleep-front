"use client";
import {Montserrat_Alternates} from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";

const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: ["900", "800", "600", "200"]});

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
        <body className={sans.className}>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                {children}
        </body>
        </html>
    );
}
