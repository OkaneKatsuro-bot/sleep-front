'use client'
import {motion} from "framer-motion";
import UserTable from "@/components/admin-components/users-admin-components/users-tables";

export function Users() {
    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className="w-full  pl-24 overflow-x-hidden"
        >
            <section className=" h-screen ">
                <div className="text-7xl pl-5">Пользователи</div>
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className="w-screen pt-12  px-4 "
                >
                    <UserTable/>
                </motion.div>
            </section>
        </motion.div>
    )
}
