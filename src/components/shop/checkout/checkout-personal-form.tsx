import React from 'react';
import {WhiteBlock} from "@/components/shop/white-block";
import {FormTextarea} from "@/components/shop/form";



interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormTextarea name="firstName" className="text-base" placeholder="Имя" />
        <FormTextarea name="lastName" className="text-base" placeholder="Фамилия" />
        <FormTextarea name="email" className="text-base" placeholder="E-Mail" />
        <FormTextarea name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
