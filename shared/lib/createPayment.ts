import axios from 'axios';
// types
import { PaymentData } from '@/@types/yookassa';

export const createPayment = async (details: any) => {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount,
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL as string,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_API_KEY as string,
        password: '',
      },
      header: {
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
};
