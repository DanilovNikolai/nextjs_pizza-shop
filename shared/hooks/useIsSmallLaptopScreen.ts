import { useState, useEffect } from 'react';

export const useIsSmallLaptopScreen = () => {
  const [isSmallLaptopScreen, setIsSmallLaptopScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallLaptopScreen(window.innerWidth <= 1024);
    };

    // Устанавливаем начальное значение
    handleResize();

    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', handleResize);

    // Убираем обработчик при размонтировании
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSmallLaptopScreen;
};
