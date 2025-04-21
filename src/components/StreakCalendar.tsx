
import React from 'react';
import { motion } from 'framer-motion';

type StreakCalendarProps = {
  streakDays?: number[];            // Indexes of days user kept streak (0=Mon...6=Sun)
  daysToShow?: number;              // Number of days to show (default 7)
  activeColor?: string;             // Color for active (streak) days
  inactiveColor?: string;           // Color for inactive (missed) days
  showLabels?: boolean;             // Show weekday labels
  labels?: string[];                // Labels for the days (first 7 used)
  animate?: boolean;                // Animate active days
};

const DEFAULT_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const StreakCalendar: React.FC<StreakCalendarProps> = ({
  streakDays = [],
  daysToShow = 7,
  activeColor = "#5E35B1",
  inactiveColor = "#E0E0E0",
  showLabels = true,
  labels = DEFAULT_LABELS,
  animate = true,
}) => {
  return (
    <div className="streak-calendar mb-6">
      <h3 className="text-lg font-medium mb-2">Your Week</h3>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(daysToShow)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            {showLabels && (
              <span className="text-xs text-gray-500 mb-1">
                {labels[index] || ""}
              </span>
            )}
            <motion.div
              className="h-10 w-10 rounded-full flex items-center justify-center text-sm"
              style={{
                backgroundColor: streakDays.includes(index) ? activeColor : inactiveColor,
                color: streakDays.includes(index) ? 'white' : '#757575',
                boxShadow: streakDays.includes(index)
                  ? "0px 0px 4px 0px rgba(94,53,177,0.2)"
                  : undefined
              }}
              animate={animate && streakDays.includes(index)
                ? {
                    scale: [1, 1.15, 1],
                    boxShadow: [
                      "0px 0px 0px rgba(94, 53, 177, 0)",
                      "0px 0px 8px rgba(94, 53, 177, 0.5)",
                      "0px 0px 0px rgba(94, 53, 177, 0)"
                    ]
                  }
                : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {index + 1}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCalendar;

