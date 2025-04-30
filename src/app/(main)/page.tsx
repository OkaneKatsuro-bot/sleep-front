"use client"


import Footer from "@/components/base-ui/footer";
import Steps from "@/components/base-ui/steps";
import {Hero} from "@/components/base-ui/hero";
import {TopBar} from "@/components/base-ui/top-bar";
import {FeaturesSectionDemo} from "@/components/base-ui/services";
import {SleepStats} from "@/components/base-ui/blocks";

import TeamCard from "@/components/base-ui/team";
import Information from "@/components/base-ui/information";
import {PostPageComp} from "@/components/postsforuser/PostPageComp";

export default function Home() {
    return (
        <>
            <div className=" bg-cover bg-center min-h-screen">
                <div className="absolute flex justify-center w-screen">
                    <TopBar/>
                </div>
                {/*новый выриант hero*/}
                <div id="Тест">
                    <Hero/>
                </div>
                <div id="Услуги">
                    <FeaturesSectionDemo/>
                </div>
                {/* Проблемы со сном */}
                <div id="Нарушение сна">
                    <SleepStats/>
                </div>
                {/* Статьи */}
                <div id="Статьи" className="space-y-2">
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white py-2">
                        Изучите проблемы со сном подробнее
                    </h4>
                    <PostPageComp showLimited={true}/>
                </div>
                <div id="Как мы можем помочь вам" className="">
                    <Steps/>
                </div>
                <div id="Команда">
                    <TeamCard/>
                </div>
                <Information/>
                <Footer/>

            </div>
        </>
    );
}