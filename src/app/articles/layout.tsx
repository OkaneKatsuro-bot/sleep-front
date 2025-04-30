import type {Metadata} from "next";
import {Header} from "@/components/base-ui/header";


export const metadata: Metadata = {
    title: "Михаил Бочкарев",
    description: "Центр здорового сна",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main>
            <Header hasSearch={true}/>
            {children}
        </main>
    );
}
