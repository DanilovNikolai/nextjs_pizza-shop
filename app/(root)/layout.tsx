import type { Metadata } from 'next';
import { Header } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
  description: '',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  console.log('Modal:', modal);

  
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal && <div className="modal-wrapper">{modal}</div>}
    </main>
  );
}
