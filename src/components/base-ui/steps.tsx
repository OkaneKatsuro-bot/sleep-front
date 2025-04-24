import React from "react";

import {motion} from "framer-motion";
import {TimelineDemo} from "@/components/ui/timelinecomponent";

const Steps = () => {
    return (
        <div className="relative bg-gradient-to-b from-white to-blue-50 dark:from-neutral-900 dark:to-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Полупрозрачный круг на фоне */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-blue-100 dark:bg-neutral-700 rounded-full opacity-30 blur-3xl"></div>

                <motion.h4
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-3xl lg:text-5xl font-extrabold text-center text-black dark:text-white tracking-tight max-w-4xl mx-auto"
                >
                    Как это работает?
                </motion.h4>

                <motion.h4
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                    className="text-xl lg:text-3xl font-semibold text-center text-black dark:text-white max-w-3xl mx-auto mt-6"
                >
                    Проблемы со сном не являются неизбежными. Позвольте нашей команде помочь вам!
                </motion.h4>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1.2}}
                    className="text-black dark:text-white text-xl italic text-center max-w-2xl mx-auto mt-4 mb-8"
                >
                    Качественный сон — это основа вашего здоровья и хорошего самочувствия
                </motion.div>

                <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1.5}}
                    className="relative z-10"
                >
                    <TimelineDemo/>
                </motion.div>
            </div>
        </div>
    );
};

export default Steps;
