import React from 'react';

interface Props {
  className?: string;
}

export default function Dashboard({ className }: Props) {
  return <div className={className}>page</div>;
}
