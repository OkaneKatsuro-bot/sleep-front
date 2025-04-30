import type {Metadata} from "next";
import {Toaster} from "react-hot-toast";
// import {redirect} from "next/navigation";
// import {checkMe} from "@/app/action";
import {Header} from "@/components/base-ui/header";


export const metadata: Metadata = {
    title: "Магазин",
    description: "Центр здорового сна",
};


export default async function RootLayout({
                                             children,
                                             modal,
                                         }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    // const data = await checkMe();
    //
    // if (!data.success || !data.user) {
    //     redirect('/signin');
    // }

    return (
        <div>
            <Header hasSearch={false}/>
            {children}
            {modal}
            <Toaster position="top-right"/>
        </div>
    );
}
