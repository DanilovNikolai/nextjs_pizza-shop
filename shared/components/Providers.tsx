'use client';

// react-hot-toast lib
import { Toaster } from 'react-hot-toast';
// next-auth
import { SessionProvider } from 'next-auth/react';
// types
import { PropsWithChildren } from 'react';
// nextjs-toploader
import NextTopLoader from 'nextjs-toploader';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NextTopLoader />
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </>
  );
};
