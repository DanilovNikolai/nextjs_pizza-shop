'use client';

import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 768);

    updateSize(); // Проверка при монтировании
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};
