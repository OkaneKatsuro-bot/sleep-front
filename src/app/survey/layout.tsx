import type {Metadata} from "next";
import {Header} from "@/components/base-ui/header";

export const metadata: Metadata = {
    title: "Про нас",
    description: "Центр здорового сна",
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
