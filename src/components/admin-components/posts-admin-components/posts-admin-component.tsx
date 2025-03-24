"use client"
import React from 'react';
import {motion} from 'framer-motion';
import 'md-editor-rt/lib/style.css';
import {usePostEditorStore} from "@/components/admin-components/posts-admin-components/_postStore";
import {PostRedacor} from "@/components/admin-components/posts-admin-components/posts-redactor";
import {PostTable} from "@/components/admin-components/posts-admin-components/posts-table";

export function Posts() {
    const {isCreatingPost} = usePostEditorStore();


    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1.5, ease: "easeOut"}}
            className="w-full h-screen pl-24 overflow-x-hidden"
        >
            <section className="relative ps-5 h-full flex flex-col">
                <div className='flex text-7xl mb-4'>Создание статей</div>

                {isCreatingPost ? (
                    <PostRedacor/>
                ) : (
                    <PostTable/>
                )}
            </section>
        </motion.div>
    );
}
