
import React from 'react';
import Header from './Header';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { SidebarProvider } from '@/components/ui/sidebar';
import ChatSidebar from './ChatSidebar';

const Layout: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col h-screen">
        <Header />
        
        <div className="flex flex-1 overflow-hidden mt-16">
          <ChatSidebar />
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <ChatHistory />
            </div>
            <div className="border-t p-2">
              <ChatInput />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
