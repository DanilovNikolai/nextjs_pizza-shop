// component
import { WhiteBlock, CheckoutItemDetails } from './';
// lucide icons
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
// ui
import { Button, Skeleton } from './ui';

const VAT = 7;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading?: boolean;
}

export const CheckoutInvoice: React.FC<Props> = ({ loading, totalAmount }) => {
  const vatPrice = Math.round((totalAmount * VAT) / 100);

  return (
    <WhiteBlock className="p-6 sticky top-4 mmd:relative">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="w-[50%] h-11" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalAmount + vatPrice + DELIVERY_PRICE} ₽
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость товаров:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${vatPrice} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`}
      />

      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
