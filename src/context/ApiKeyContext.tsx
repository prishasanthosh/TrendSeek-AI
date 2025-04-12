
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface ApiKeys {
  newsApi?: string;
  [key: string]: string | undefined;
}

interface ApiKeyContextType {
  apiKeys: ApiKeys;
  setApiKey: (service: string, key: string) => void;
  hasRequiredKeys: () => boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKeys>(() => {
    // Try to load from localStorage if available
    const savedKeys = localStorage.getItem('trendseer_api_keys');
    return savedKeys ? JSON.parse(savedKeys) : {};
  });

  const setApiKey = (service: string, key: string) => {
    const newApiKeys = {
      ...apiKeys,
      [service]: key,
    };
    
    setApiKeys(newApiKeys);
    localStorage.setItem('trendseer_api_keys', JSON.stringify(newApiKeys));
    
    toast({
      title: 'API Key Saved',
      description: `Your ${service} API key has been saved successfully.`,
    });
  };

  const hasRequiredKeys = () => {
    // Check if we have the required API keys
    return Boolean(apiKeys.newsApi);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKeys, setApiKey, hasRequiredKeys }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKeys() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKeys must be used within an ApiKeyProvider');
  }
  return context;
}
