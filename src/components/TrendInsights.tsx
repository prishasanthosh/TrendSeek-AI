
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Newspaper, AlertTriangle } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { useApiKeys } from '@/context/ApiKeyContext';

const TrendInsights: React.FC = () => {
  const { userPreferences } = useChat();
  const { hasRequiredKeys } = useApiKeys();

  if (!hasRequiredKeys()) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            API Keys Required
          </CardTitle>
          <CardDescription>
            Set up your API keys to see real-time trend insights
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!userPreferences?.industry) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-trendseer-600" />
            Trend Insights
          </CardTitle>
          <CardDescription>
            Set your industry preferences to receive tailored trend insights
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-trendseer-600" />
          {userPreferences.industry} Trend Insights
        </CardTitle>
        <CardDescription>
          Recent trends in {userPreferences.industry}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-start gap-3 border-b border-border pb-2">
          <Newspaper className="h-5 w-5 text-trendseer-500 mt-0.5" />
          <div>
            <h3 className="font-medium">Sustainability Focus</h3>
            <p className="text-sm text-muted-foreground">
              Rising consumer demand for eco-friendly products and transparent practices
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 border-b border-border pb-2">
          <Newspaper className="h-5 w-5 text-trendseer-500 mt-0.5" />
          <div>
            <h3 className="font-medium">AI Integration</h3>
            <p className="text-sm text-muted-foreground">
              Companies leveraging AI for personalization and operational efficiency
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Newspaper className="h-5 w-5 text-trendseer-500 mt-0.5" />
          <div>
            <h3 className="font-medium">Omnichannel Experiences</h3>
            <p className="text-sm text-muted-foreground">
              Seamless customer journeys across digital and physical touchpoints
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendInsights;
