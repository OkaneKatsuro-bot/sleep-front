import {cn} from "@/lib/utils";

interface Props {
    src: string;
    className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({src, className}) => {
    return <img width={60} height={60} className={cn('', className)} src={src} alt={""}/>;
};
