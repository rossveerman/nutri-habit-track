
import React, { useState } from 'react';
import { useNutriTrack } from '@/hooks/useNutriTrack';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Profile() {
  const { user, updateCalorieGoal } = useNutriTrack();
  const [calorieInput, setCalorieInput] = useState(user.calorieGoal.toString());
  
  const handleCalorieGoalUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(calorieInput);
    if (value > 0) {
      updateCalorieGoal(value);
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Profile</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-nutritrack-teal/20 flex items-center justify-center text-nutritrack-teal font-bold text-xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-nutritrack-gray">Free Plan</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Nutrition Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalorieGoalUpdate} className="space-y-4">
            <div>
              <Label htmlFor="calorieGoal">Daily Calorie Target</Label>
              <div className="flex gap-2">
                <Input
                  id="calorieGoal"
                  type="number"
                  value={calorieInput}
                  onChange={(e) => setCalorieInput(e.target.value)}
                  min="1"
                  required
                />
                <Button type="submit" className="bg-nutritrack-teal hover:bg-nutritrack-teal/90">
                  Update
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="waterGoal">Daily Water Goal</Label>
              <div className="flex items-center">
                <Input
                  id="waterGoal"
                  type="number" 
                  value={user.waterGoal}
                  disabled
                />
                <span className="ml-2">glasses</span>
              </div>
              <p className="text-xs text-nutritrack-gray mt-1">Water goal adjustment will be available in the next update.</p>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Language</Label>
            <div className="flex items-center justify-between mt-1">
              <span>English (US)</span>
              <span className="text-xs text-nutritrack-gray italic">More languages coming soon</span>
            </div>
          </div>
          
          <div>
            <Label>Theme</Label>
            <div className="flex items-center justify-between mt-1">
              <span>Light Mode</span>
              <span className="text-xs text-nutritrack-gray italic">Dark mode coming soon</span>
            </div>
          </div>
          
          <div>
            <Label>App Version</Label>
            <div className="text-sm text-nutritrack-gray">1.0.0</div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center pt-4">
        <Button variant="outline" className="text-nutritrack-gray">
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default Profile;
