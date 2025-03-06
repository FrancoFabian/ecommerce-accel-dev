import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface AnimationOptions {
  duration?: number;
  ease?: string;
  fromDirection?: "left" | "right";
  [key: string]: unknown;
}

export const useFormTransition = <T extends HTMLElement>(
  isVisible: boolean,
  animationOptions: AnimationOptions = {}
) => {
  const elementRef = useRef<T | null>(null); // Referencia al elemento
  const hasAnimatedRef = useRef(false); // Referencia para rastrear animación inicial

  const fromX = animationOptions.fromDirection === "right" ? 400 : -400;

  useGSAP(() => {
    if (!elementRef.current) return;

    if (hasAnimatedRef.current || !isVisible) {
      // Solo animar si ya se hizo la inicial o si el estado cambió
      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          x: isVisible ? fromX : -fromX,
          ...animationOptions,
        },
        {
          opacity: 1,
          x: 0,
          duration: animationOptions.duration || 0.4,
          ease: animationOptions.ease || "power1.inOut",
        }
      );
    }

    hasAnimatedRef.current = true; // Marca como animado
  }, [isVisible]);

  return elementRef;
};
