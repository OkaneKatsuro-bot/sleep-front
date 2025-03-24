"use client"
import {motion} from "framer-motion";
import UserStatisticsChart from "@/components/admin-components/main-admin-components/users-statistic-chart";
import UsersTabs from "@/components/admin-components/main-admin-components/users-tabs";


const MainAdminComponent = () => {


    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1.5, ease: "easeOut"}}
            className="w-full  ml-24"
        >
            <section className=" h-screen ">
                <div className='text-7xl  '>Личный кабинет</div>
                <div className="h-max flex  items-center ">
                    <div className="flex flex-row space-x-20  w-full pt-12  px-4 ">
                        <div className=" w-1/2"><UserStatisticsChart/></div>
                        <div className=" w-1/2 h-max flex"><UsersTabs/></div>

                    </div>
                </div>

            </section>
        </motion.div>)
}

export default MainAdminComponent;