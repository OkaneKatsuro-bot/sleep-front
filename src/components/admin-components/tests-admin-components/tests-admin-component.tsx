'use client'

import React from "react";
import {TestCreator} from "@/components/admin-components/tests-admin-components/tests-creator";
import { motion } from "framer-motion";

export function Tests() {


    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1.5, ease: "easeOut"}}
            className="w-full h-screen pl-24 overflow-x-hidden"
        >
            <section className="relative ps-5 h-full flex flex-col">
                <div className='flex text-7xl mb-4'>Создание опросников</div>
                <TestCreator/>
            </section>
        </motion.div>
    );
}
