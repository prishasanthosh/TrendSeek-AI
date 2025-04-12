
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';
import { Settings } from 'lucide-react';

export interface UserPreferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ open, onOpenChange }) => {
  const { userPreferences, updateUserPreferences } = useChat();
  const [industry, setIndustry] = useState(userPreferences?.industry || '');
  const [audience, setAudience] = useState(userPreferences?.targetAudience || '');
  const [contentGoals, setContentGoals] = useState(userPreferences?.contentGoals?.join(', ') || '');
  
  const handleSave = () => {
    updateUserPreferences({
      industry: industry || undefined,
      targetAudience: audience || undefined,
      contentGoals: contentGoals.split(',').map(goal => goal.trim()).filter(Boolean),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Preferences</DialogTitle>
          <DialogDescription>
            Setting your preferences helps TrendSeer provide more relevant trend insights.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Technology, Fashion, Finance"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Millennials, B2B Executives"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="contentGoals">Content Goals (comma separated)</Label>
            <Input
              id="contentGoals"
              value={contentGoals}
              onChange={(e) => setContentGoals(e.target.value)}
              placeholder="e.g., Engagement, Lead Generation, Brand Awareness"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const UserPreferencesButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button 
      variant="outline"
      size="sm"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Settings className="h-4 w-4" />
      Preferences
    </Button>
  );
};

export default UserPreferences;
