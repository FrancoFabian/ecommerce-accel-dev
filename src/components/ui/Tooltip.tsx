'use client';
import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  maxWidth?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
  maxWidth = 'max-w-xs'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let left = 0;
      let top = 0;

      switch (position) {
        case 'top':
          left = (containerRect.width - tooltipRect.width) / 2;
          top = -tooltipRect.height - 8;
          break;
        case 'bottom':
          left = (containerRect.width - tooltipRect.width) / 2;
          top = containerRect.height + 8;
          break;
        case 'left':
          left = -tooltipRect.width - 8;
          top = (containerRect.height - tooltipRect.height) / 2;
          break;
        case 'right':
          left = containerRect.width + 8;
          top = (containerRect.height - tooltipRect.height) / 2;
          break;
      }

      setTooltipStyle({ left, top });
    }
  }, [isVisible, position]);

  const getArrowClasses = () => {
    const base = 'absolute w-2 h-2 bg-gray-800 rotate-45';
    switch (position) {
      case 'top':
        return `${base} -bottom-1 left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${base} -top-1 left-1/2 -translate-x-1/2`;
      case 'left':
        return `${base} -right-1 top-1/2 -translate-y-1/2`;
      case 'right':
        return `${base} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return base;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg ${maxWidth} pointer-events-none`}
          style={tooltipStyle}
        >
          {content}
          <div className={getArrowClasses()} />
        </div>
      )}
    </div>
  );
}; 