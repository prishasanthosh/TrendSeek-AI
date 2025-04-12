
import React from 'react';
import { useChat } from '@/context/ChatContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import { Loader2 } from 'lucide-react';

const ChatHistory: React.FC = () => {
  const { currentSession, loading } = useChat();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages]);

  if (!currentSession) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground">No chat session active</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {currentSession.messages
          .filter(msg => msg.role !== 'system') // Don't show system messages
          .map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
        {loading && (
          <div className="flex justify-start p-4">
            <div className="flex items-center space-x-2 bg-secondary p-3 rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">TrendSeer is thinking...</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatHistory;
