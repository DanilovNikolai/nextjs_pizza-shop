import React from 'react';

interface Props {
  onClose?: VoidFunction;
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({ className }) => {
  return <div className={className}>REGISTER</div>;
};
