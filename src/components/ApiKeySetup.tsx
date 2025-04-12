
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
import { useApiKeys } from '@/context/ApiKeyContext';
import { Key, Check } from 'lucide-react';

interface ApiKeySetupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ open, onOpenChange }) => {
  const { apiKeys, setApiKey } = useApiKeys();
  const [newsApiKey, setNewsApiKey] = useState(apiKeys.newsApi || '');
  
  const handleSave = () => {
    if (newsApiKey) {
      setApiKey('newsApi', newsApiKey);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Keys Setup</DialogTitle>
          <DialogDescription>
            TrendSeer needs API keys to access trend data. Your keys are stored locally and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="newsApiKey">
              News API Key {apiKeys.newsApi && <Check className="inline w-4 h-4 text-green-500" />}
            </Label>
            <Input
              id="newsApiKey"
              type="password"
              value={newsApiKey}
              onChange={(e) => setNewsApiKey(e.target.value)}
              placeholder="Enter your News API key"
            />
            <p className="text-xs text-muted-foreground">
              Get a key at <a href="https://newsapi.org" target="_blank" rel="noreferrer" className="text-trendseer-600 hover:underline">newsapi.org</a>
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Keys
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ApiKeyButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { hasRequiredKeys } = useApiKeys();
  
  return (
    <Button 
      variant={hasRequiredKeys() ? "outline" : "default"}
      size="sm"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Key className="h-4 w-4" />
      {hasRequiredKeys() ? 'API Keys' : 'Setup API Keys'}
    </Button>
  );
};

export default ApiKeySetup;
