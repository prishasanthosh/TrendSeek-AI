
import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, 
  SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, 
  SidebarSeparator } from '@/components/ui/sidebar';
import { useChat } from '@/context/ChatContext';
import { PlusCircle, MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

const ChatSidebar: React.FC = () => {
  const { sessions, currentSession, startNewSession, loadSession, clearSession } = useChat();

  const handleNewChat = () => {
    startNewSession();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between py-2 px-4">
          <h2 className="text-lg font-medium">Chat History</h2>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNewChat}
            title="New Chat"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <SidebarMenu>
              {sessions.map((session) => (
                <SidebarMenuItem key={session.id}>
                  <SidebarMenuButton
                    isActive={currentSession?.id === session.id}
                    onClick={() => loadSession(session.id)}
                    className="flex items-center justify-between"
                    tooltip={session.title}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      <div className="truncate">
                        <span>{session.title}</span>
                        <p className="text-xs text-muted-foreground truncate">
                          {formatDistanceToNow(new Date(session.updatedAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </ScrollArea>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
