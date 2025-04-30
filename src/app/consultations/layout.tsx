import type {Metadata} from "next";
import {Header} from "@/components/base-ui/header";


export const metadata: Metadata = {
    title: "Записаться на прием",
    description: "Центр здорового сна",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {


    return (

        <main>
            <Header hasSearch={false}/>
            {children}
        </main>

    );
}
