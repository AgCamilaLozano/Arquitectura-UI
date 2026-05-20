'use client';
import { useRef, ElementType } from 'react';

interface AnimatedIconButtonProps {
  Icon: ElementType;
  onClick?: () => void;
}

export default function AnimatedIconButton({ Icon, onClick }: AnimatedIconButtonProps) {
  const iconRef = useRef(null);

  return (
    <button onClick={onClick} className="group">
      <div className="relative bg-muted/50 rounded-full p-2 text-sm transition-all duration-300 transform group-hover:scale-110 active:scale-95 group-hover:shadow-2xl">
        <div className="absolute -bottom-1 right-5 rounded-full w-3 h-3 bg-muted/50"></div>
        <div ref={iconRef}>
          <Icon className="h-5 w-5 z-50" />
        </div>
      </div>
    </button>
  );
}