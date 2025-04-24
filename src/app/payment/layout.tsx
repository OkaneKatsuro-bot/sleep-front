import type {Metadata} from 'next';
import {Suspense} from 'react';
import Footer from "@/components/base-ui/footer";
import {Header} from "@/components/base-ui/header";

export const metadata: Metadata = {
    title: 'ASLEEP | О Компании',
};

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({children}: HomeLayoutProps) {
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
