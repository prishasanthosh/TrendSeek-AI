
import React from 'react';
import Layout from '@/components/Layout';
import { ChatProvider } from '@/context/ChatContext';
import { ApiKeyProvider } from '@/context/ApiKeyContext';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <ApiKeyProvider>
      <ChatProvider>
        <Layout />
      </ChatProvider>
    </ApiKeyProvider>
  );
};

export default Index;
