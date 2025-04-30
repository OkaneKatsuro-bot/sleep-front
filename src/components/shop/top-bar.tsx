import React from 'react';

import { cn } from '@/lib/utils';
import {Container} from "@/components/ui/container";
import {Category} from "@/types/posts.type";
import {Categories} from "@/components/shop/categories";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-4 shadow-lg shadow-black/5 z-10', className)}>
      <Container
        className={cn(
          'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
          className
        )}
      >
        {/* Категории */}
        <div className="flex-1 sm:order-1">
          <Categories
            items={categories}
            className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          />
        </div>

        {/* Сортировка (опционально, пока закомментировано) */}
        {/* <div className="flex justify-end sm:order-2">
          <SortPopup />
        </div> */}
      </Container>
    </div>
  );
};
