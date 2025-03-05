'use client';

// types
import { Order, User } from '@prisma/client';
// components
import { Container, Title } from './';
// cn
import { cn } from '../lib/utils';
// shadcn-ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
// Api
import { Api } from '../services/api-client';
import { useEffect, useState } from 'react';
// lib
import { format } from 'date-fns';

interface Props {
  data: User;
  className?: string;
}

export const Orders: React.FC<Props> = ({ className }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    Api.orders.getAll().then((data) => {
      setOrders(data);
    });
  }, []);

  return (
    <Container className={cn('my-10 mmd:w-full', className)}>
      <Title text={`История заказов`} size="md" className="font-bold mb-5" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-nowrap">Заказ №</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Сумма заказа</TableHead>
            <TableHead>Адрес доставки</TableHead>
            <TableHead>Дата заказа</TableHead>
            <TableHead className="text-right">Время заказа</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell
                className={cn({
                  'text-red-600': order.status === 'CANCELLED',
                  'text-yellow-500': order.status === 'PENDING',
                  'text-green-600': order.status === 'SUCCEEDED',
                })}
              >
                {(order.status === 'CANCELLED' && 'ОТМЕНЁН') ||
                  (order.status === 'PENDING' && 'ОЖИДАНИЕ ОПЛАТЫ') ||
                  (order.status === 'SUCCEEDED' && 'В РАБОТЕ')}
              </TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{format(order.createdAt, 'dd.MM.yy')}</TableCell>
              <TableCell className="text-right">{format(order.createdAt, 'hh:mm')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
