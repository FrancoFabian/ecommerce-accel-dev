import { useEffect } from 'react';

export const useRippleEffect = (className: string) => {
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(`.${className}`);

    const createRipple = (event: MouseEvent) => {
      const button = event.currentTarget as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.4)';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple-animation 0.7s linear';
      ripple.style.pointerEvents = 'none';

      button.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', createRipple);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('click', createRipple);
      });
    };
  }, [className]);
};