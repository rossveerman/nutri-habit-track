
import React from "react";
import Confetti from "react-confetti";

interface CelebrationScreenProps {
  isGoalReached: boolean;
  children?: React.ReactNode;
}

/**
 * Shows a confetti animation and congratulation headline when isGoalReached is true.
 * Usage: Place this on top of your page or inside a Dialog, and pass isGoalReached={yourGoalCheck}.
 */
const CelebrationScreen: React.FC<CelebrationScreenProps> = ({ isGoalReached, children }) => {
  // We use window.innerWidth/Height for demo simplicity; for better SSR support, use a hook.
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {isGoalReached && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.12}
        />
      )}
      {isGoalReached && (
        <h1 className="text-2xl font-bold text-center my-10 text-nutritrack-teal animate-fade-in">
          Goal Reached!
        </h1>
      )}
      {children}
    </div>
  );
};

export default CelebrationScreen;
