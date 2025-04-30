
"use client"; // Эта строка должна быть первой


import Information from "@/components/base-ui/information";
import {Hero} from "@/components/base-ui/hero";
import SleepApneaInfo from "@/components/base-ui/sleep-apnoe-info";
import Steps from "@/components/base-ui/steps";
import Footer from "@/components/base-ui/footer";


export default function SignInPage() {
    return (
        <div className='bg-cover bg-center min-h-screen'>

            <Hero/>
            <SleepApneaInfo/>
            <Steps/>
            <Information/>
            <Footer/>
        </div>
    );
}
