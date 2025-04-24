"use client"
import React from 'react';
import {motion} from 'framer-motion';
import ConsulSetting from "@/components/admin-components/calendars-admin-components/consul-setting";

export function Calendars() {


    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1.5, ease: "easeOut"}}
            className="w-full h-screen pl-24 overflow-x-hidden"
        >
            <section className="relative ps-5 h-full flex flex-col">
                <div className='flex text-7xl mb-4'>Создание консультаци</div>
                <div className='mt-11'><ConsulSetting/></div>
            </section>
        </motion.div>
    );
}
