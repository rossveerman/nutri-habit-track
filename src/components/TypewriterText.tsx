
import React, { useEffect, useState } from 'react';

// Usage: <TypewriterText text="Stay motivated!" className="text-lg font-bold" />

const TypewriterText: React.FC<{ text: string, className?: string, speed?: number }> = ({
  text,
  className = "",
  speed = 45
}) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let current = 0;
    const loop = setInterval(() => {
      setDisplayed(prev => prev + text[current]);
      current++;
      if (current >= text.length) clearInterval(loop);
    }, speed);
    return () => clearInterval(loop);
  }, [text, speed]);

  return (
    <span className={className} aria-live="polite">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText;
