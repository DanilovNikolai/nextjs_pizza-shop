import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Pizza | Корзина',
  description: '',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#F4F1EE]">{children}</main>;
}
