
import React from "react";
import { UserRound, Settings, CalendarCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StreakCalendar from "@/components/StreakCalendar";

const ProfileSection: React.FC = () => {
  // Hardcoded demo user details; connect to user context/hook as needed
  const user = {
    name: "Jane Doe",
    initials: "JD",
    calorieGoal: 2100,
    waterGoal: 8,
    plan: "Free Plan",
    email: "jane.doe@email.com",
  };

  // Demo streak: Tues, Wed, Fri marked as 'active'
  const streakDays = [1, 2, 4];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 px-4 pt-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">My Profile</h1>
      
      {/* Moved StreakCalendar to the top of the page */}
      <div className="mb-7">
        <StreakCalendar
          streakDays={streakDays}
          daysToShow={7}
          animate={true}
          showLabels={true}
          labels={["M", "T", "W", "T", "F", "S", "S"]}
        />
        <div className="text-center text-xs text-nutritrack-gray/80 mb-1">
          Your Consistency (streak days this week)
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-nutritrack-teal/20 flex items-center justify-center text-nutritrack-teal font-bold text-3xl">
          <UserRound size={56} className="text-nutritrack-teal" />
        </div>
        <h2 className="font-semibold text-lg mt-2">{user.name}</h2>
        <span className="text-xs text-nutritrack-gray">{user.plan}</span>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck size={18} />
            Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Daily Calories</div>
              <div className="text-base font-semibold">{user.calorieGoal} kcal</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Water Goal</div>
              <div className="text-base font-semibold">{user.waterGoal} glasses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={18} />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-500">Email</span>
              <div className="text-base">{user.email}</div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Theme</span>
              <div className="text-base">Light (only)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col mt-3 gap-3">
        <Button variant="outline" className="text-nutritrack-gray">Sign Out</Button>
      </div>
      <div className="text-center text-xs text-gray-400 mt-4">App version 1.0.0</div>
    </div>
  );
};

export default ProfileSection;
