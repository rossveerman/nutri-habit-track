
import React, { useState } from "react";

interface AnimatedAddItemProps {
  children: React.ReactNode;
  onAdd: () => void;
  className?: string;
}

/**
 * Wrap your clickable item (e.g., food name) with <AnimatedAddItem onAdd={() => ...}>...</AnimatedAddItem>
 * You'll get a scale-down press, elastic release, and checkmark on add.
 */
const AnimatedAddItem: React.FC<AnimatedAddItemProps> = ({
  children,
  onAdd,
  className = "",
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => {
    setIsPressed(false);
    onAdd();
    setShowCheck(true);
    setTimeout(() => setShowCheck(false), 750); // Show check 0.75s
  };
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <div
      className={
        `relative p-4 rounded-lg border transition-transform duration-150 select-none cursor-pointer ` +
        (isPressed ? "scale-95" : "scale-100") +
        " " +
        className
      }
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-pressed={isPressed}
    >
      <div className={showCheck ? "opacity-50" : "opacity-100"}>{children}</div>
      {showCheck && (
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-fade-in"
          style={{ pointerEvents: "none" }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#38B2AC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              background: "white",
              borderRadius: "999px",
              boxShadow: "0 2px 8px rgba(56,178,172,0.18)",
              animation: "scale-in 0.3s cubic-bezier(.58,1.7,.36,.95)",
            }}
          >
            <circle cx="16" cy="16" r="15" stroke="#e6fffa" strokeWidth="3" fill="#fff" />
            <polyline
              points="10 17 15 22 22 11"
              stroke="#38B2AC"
              strokeWidth="3"
              fill="none"
              style={{
                strokeDasharray: 20,
                strokeDashoffset: showCheck ? 0 : 20,
                transition: "stroke-dashoffset 0.25s ease"
              }}
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default AnimatedAddItem;
