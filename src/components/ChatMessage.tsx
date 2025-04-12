import React from 'react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-trendseer-100 dark:bg-trendseer-900 flex items-center justify-center">
          <Bot className="w-5 h-5 text-trendseer-700 dark:text-trendseer-300" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] md:max-w-[70%] rounded-lg p-4",
        isUser 
          ? "bg-trendseer-500 text-white" 
          : "glass-card"
      )}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <ReactMarkdown 
            components={{
              a: ({ node, ...props }) => (
                <a 
                  {...props} 
                  className="text-trendseer-600 dark:text-trendseer-400 hover:underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                />
              ),
              ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 my-2" />,
              ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 my-2" />,
              h1: ({ node, ...props }) => <h1 {...props} className="text-xl font-bold my-2" />,
              h2: ({ node, ...props }) => <h2 {...props} className="text-lg font-bold my-2" />,
              h3: ({ node, ...props }) => <h3 {...props} className="text-base font-bold my-2" />,
              p: ({ node, ...props }) => <p {...props} className="my-2" />,
              code: ({ node, ...props }) => <code {...props} className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded" />,
              pre: ({ node, ...props }) => <pre {...props} className="bg-gray-100 dark:bg-gray-800 p-2 rounded my-2 overflow-x-auto" />,
              strong: ({ node, ...props }) => <strong {...props} className="font-bold" />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-trendseer-100 dark:bg-trendseer-900 flex items-center justify-center">
          <User className="w-5 w-5 text-trendseer-700 dark:text-trendseer-300" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
