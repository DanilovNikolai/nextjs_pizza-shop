import * as React from 'react';

interface PayOrderEmailProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderEmail: React.FC<PayOrderEmailProps> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Заказ #{orderId}</h1>
    <p>
      Оплатите заказ на сумму <b>{totalAmount} ₽</b>
    </p>
    <p>
      Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
    </p>
  </div>
);
