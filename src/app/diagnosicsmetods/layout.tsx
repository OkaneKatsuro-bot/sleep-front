import type {Metadata} from 'next';
import {Suspense} from 'react';
//import {redirect} from "next/navigation";
import {Header} from "@/components/base-ui/header";
import Footer from "@/components/base-ui/footer";
//import {checkMe} from "@/components/admin-components/main-admin-components/action";



export const metadata: Metadata = {
    title: 'Методы диагностики  | ASLEEP',
};

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default async function HomeLayout({children}: HomeLayoutProps) {
   // const data = await checkMe();
    //const session = data.success;

    // if (!session) {
    //     redirect('/signin');
    // }

    return (
        <main className="min-h-screen">
            <Suspense>
                <Header hasSearch={false}/>
            </Suspense>
            {children}
            <Suspense>
                <Footer/>
            </Suspense>
        </main>
    );
}
