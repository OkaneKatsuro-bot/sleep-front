import type {Metadata} from "next";
import {Montserrat_Alternates} from "next/font/google";
import {Header} from "@/components/base-ui/header";
import '@/app/globals.css'


const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: ["900", "800", "600", "200"]});

export const metadata: Metadata = {
    title: "Asleep",
    description: "Здоровый сон возможен",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header hasSearch={false}/>
            {children}
        </div>
    );
}