// components/Callout.tsx
import React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'danger';
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const baseStyle = "px-4 py-3 border rounded-lg my-4";
  const styles = {
    info: "bg-blue-100 border-blue-400 text-blue-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
    danger: "bg-red-100 border-red-400 text-red-800",
  };
  
  return (
    <div className={`${baseStyle} ${styles[type]}`}>
      {children}
    </div>
  );
}