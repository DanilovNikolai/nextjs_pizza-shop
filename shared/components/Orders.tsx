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
    <Container className={cn('my-10', className)}>
      <div className="flex flex-col justify-center items-center mmd:flex-1 mmd:p-5">
        <Title text={`История заказов`} size="md" className="font-bold mb-5" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Заказ №</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Адрес доставки</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Товары</TableHead>
              <TableHead>Сумма заказа</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead className="text-right">Время</TableHead>
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
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>Нет данных</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{format(order.createdAt, 'dd.MM.yy')}</TableCell>
                <TableCell className="text-right">{format(order.createdAt, 'hh:mm')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};
