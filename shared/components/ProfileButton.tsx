'use client';

// next
import Link from 'next/link';
// next-auth
import { useSession, signOut } from 'next-auth/react';
// shadcn ui
import { Button } from './ui';
// lucide
import { CircleUser, User, LogOut, ShoppingBag } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  // Функция выхода из аккаунта
  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {!session ? (
        <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <CircleUser size={18} />
          {session.user.name}
        </Button>
      )}

      {menuOpen && session && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg border z-50">
          <ul className="flex flex-col text-sm text-gray-700">
            <li>
              <Link
                href="/profile/me"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                <CircleUser size={16} />
                Профиль
              </Link>
            </li>
            <li>
              <Link
                href="/profile/orders"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingBag size={16} />
                Заказы
              </Link>
            </li>
            <li>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={onClickSignOut}
              >
                <LogOut size={16} />
                Выход
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
