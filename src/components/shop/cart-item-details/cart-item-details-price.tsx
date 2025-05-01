import { cn } from "@/lib/utils";

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(value);

  return (
    <div className={cn('flex items-baseline gap-1.5', className)}>
      <span className="text-2xl font-bold tracking-tight text-gray-900">
        {formattedPrice}
      </span>
      <span className="text-base font-medium text-gray-500">₽</span>
    </div>
  );
};