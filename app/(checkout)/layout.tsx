import { Container, Header } from '@/shared/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Pizza | Корзина',
  description: '',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Header hasSearch={false} hasCartButton={false} className="border-b-gray-200" />
        {children}
      </Container>
    </main>
  );
}
