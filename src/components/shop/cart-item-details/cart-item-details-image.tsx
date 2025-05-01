import { cn } from "@/lib/utils";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return (
    <div className={cn(
      "relative flex items-center justify-center",
      "w-15 h-15 rounded-xl bg-gray-50",
      "border-2 border-gray-100",
      "overflow-hidden",
      "transition-all hover:border-gray-200",
      className
    )}>
      <img
        width={60}
        height={60}
        className="object-contain p-1.5 mix-blend-multiply"
        src={src}
        alt="Изображение товара"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/fallback-image.svg';
        }}
      />
    </div>
  );
};