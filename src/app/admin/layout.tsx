import type {Metadata} from "next";
import Sidebar from "@/components/admin-components/sidebar";
//import {Montserrat_Alternates} from "next/font/google";
//TODO: разобраться со шрифтом
//const sans = Montserrat_Alternates({subsets: ["cyrillic"], weight: '400'});

export const metadata: Metadata = {
    title: "Админ Панель",
    description: "Админ панель для управления приложением",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Sidebar/>
            {children}
        </div>
    );
}
