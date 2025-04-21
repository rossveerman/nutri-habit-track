
import React, { useEffect, useRef, useState } from "react";

/**
 * ParallaxWrapper
 * Wrap any content to make it subtly move at a different speed as the page scrolls.
 * Use: <ParallaxWrapper speed={0.3}><YourContent /></ParallaxWrapper>
 * speed = 0 (static), speed > 0 and < 1 for subtle, layered movement.
 */
interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Lower is slower/background. 0.2-0.5 is natural for UI cards.
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  className = "",
  speed = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // Move Y based on scroll position: (distance from top of window) * speed
      const parallaxY = rect.top * speed;
      setOffset(parallaxY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        transition: "transform 0.1s cubic-bezier(.33,1,.68,1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxWrapper;

