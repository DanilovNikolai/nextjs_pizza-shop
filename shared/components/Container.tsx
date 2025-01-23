import { cn } from '@/shared/lib/utils';
import React from 'react';

interface ContainerProps {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-[1280px] px-5 mmd:px-3 mmd:max-w-full mmd:flex mmd:flex-wrap mmd:justify-between',
        className
      )}
    >
      {children}
    </div>
  );
};
