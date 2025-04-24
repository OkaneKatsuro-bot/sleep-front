import type {Metadata} from 'next';
import {Suspense} from 'react';
import {Header} from "@/components/base-ui/header";
import Footer from "@/components/base-ui/footer";


export const metadata: Metadata = {
    title: 'Ножи СПБ | О Компании',
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
