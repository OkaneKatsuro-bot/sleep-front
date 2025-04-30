"use client";
import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ProductForm} from "../product-form";
import {ProductFull} from "@/types/shop.types/shop.type";


interface AdminProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductFull;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        product,
                                                                    }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[90%] md:max-w-[800px] lg:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Просмотр товара</DialogTitle>
                </DialogHeader>
                <ProductForm
                    product={product}
                    onSubmit={() => {
                        onClose(); // Закрыть модальное окно после успешного редактирования
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};