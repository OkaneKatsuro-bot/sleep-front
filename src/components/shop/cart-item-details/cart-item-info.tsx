import { cn } from "@/lib/utils";

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold leading-6 text-gray-900 truncate">
          {name}
        </h2>
      </div>
      {details && (
        <p className="text-sm text-gray-600 leading-5 line-clamp-2">
          {details}
        </p>
      )}
    </div> 
  );
};