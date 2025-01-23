'use client';

import { useState } from 'react';
// shadcn ui
import { Button, Dialog, DialogContent, DialogTitle, SheetDescription } from '../ui';
// next-auth
import { signIn } from 'next-auth/react';
// components
import { LoginForm, RegisterForm } from './forms';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formType, setFormType] = useState<'login' | 'register'>('login');

  const onSwitchFormType = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className=" bg-white p-10 w-max-[30%] mmd:p-7 mmd:rounded-2xl">
        <DialogTitle className="hidden" />
        <SheetDescription className="hidden" />

        {formType === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
        </div>

        <Button variant="outline" onClick={onSwitchFormType} type="button" className="h-12">
          {formType === 'login' ? 'Регистрация' : 'Войти'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
