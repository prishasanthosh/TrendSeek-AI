
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, ChatSession, UserPreference } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

interface ChatContextType {
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  userPreferences: UserPreference | null;
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
  startNewSession: () => void;
  loadSession: (sessionId: string) => void;
  clearSession: () => void;
  updateUserPreferences: (preferences: Partial<UserPreference>) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreference | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize or load from localStorage on first render
  useEffect(() => {
    const savedSessions = localStorage.getItem('trendseer_sessions');
    const savedPreferences = localStorage.getItem('trendseer_user_prefs');
    
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions);
      setSessions(parsedSessions);
      
      // Load the most recent session if available
      if (parsedSessions.length > 0) {
        setCurrentSession(parsedSessions[0]);
      } else {
        startNewSession();
      }
    } else {
      startNewSession();
    }
    
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    } else {
      setUserPreferences({
        id: uuidv4(),
        contentGoals: [],
        previousTrends: []
      });
    }
  }, []);

  // Save sessions and preferences to localStorage when they change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('trendseer_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    if (userPreferences) {
      localStorage.setItem('trendseer_user_prefs', JSON.stringify(userPreferences));
    }
  }, [userPreferences]);

  const startNewSession = () => {
    const newSession: ChatSession = {
      id: uuidv4(),
      title: 'New Trend Analysis',
      messages: [
        {
          id: uuidv4(),
          role: 'system',
          content: 'I am TrendSeer, your AI trend analysis assistant. I help you stay on top of online trends and provide insights on their relevance and potential longevity.',
          timestamp: new Date()
        },
        {
          id: uuidv4(),
          role: 'assistant',
          content: 'Hello! I\'m TrendSeer Insight AI. I\'m here to help you track and analyze online trends across social media, news, and search data. How can I assist with your trend analysis today?',
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setCurrentSession(newSession);
    setSessions(prev => [newSession, ...prev.filter(s => s.id !== newSession.id)]);
  };

  const loadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    } else {
      toast({
        title: 'Session not found',
        description: 'Could not load the requested chat session.',
        variant: 'destructive'
      });
    }
  };

  const clearSession = () => {
    if (currentSession) {
      // We create a new session but maintain the memory of preferences
      startNewSession();
      
      toast({
        title: 'Chat Cleared',
        description: 'Your chat history has been cleared, but I still remember your preferences and interests.',
      });
    }
  };

  const updateUserPreferences = (preferences: Partial<UserPreference>) => {
    setUserPreferences(prev => {
      if (!prev) return { id: uuidv4(), ...preferences };
      return { ...prev, ...preferences };
    });
    
    toast({
      title: 'Preferences Updated',
      description: 'Your preferences have been saved and will be used for future trend analysis.',
    });
  };

  const sendMessage = async (content: string) => {
    if (!currentSession) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    // Update the current session with the user message
    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      updatedAt: new Date()
    };
    
    setCurrentSession(updatedSession);
    setSessions(prev => [updatedSession, ...prev.filter(s => s.id !== currentSession.id)]);
    
    // Show loading state
    setLoading(true);
    
    try {
      // This would be replaced with actual API call to LLM with memory
      // For now we'll just simulate a response
      setTimeout(() => {
        // Analyze the message for user preferences
        const industryMatch = content.match(/my industry is ([\w\s]+)/i);
        const audienceMatch = content.match(/my target audience is ([\w\s]+)/i);
        
        if (industryMatch || audienceMatch) {
          const newPrefs: Partial<UserPreference> = {};
          if (industryMatch) newPrefs.industry = industryMatch[1];
          if (audienceMatch) newPrefs.targetAudience = audienceMatch[1];
          updateUserPreferences(newPrefs);
        }
        
        // Create assistant response
        const assistantMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: generateMockResponse(content, userPreferences),
          timestamp: new Date()
        };
        
        // Update session with assistant response
        const finalSession = {
          ...updatedSession,
          messages: [...updatedSession.messages, assistantMessage],
          updatedAt: new Date()
        };
        
        setCurrentSession(finalSession);
        setSessions(prev => [finalSession, ...prev.filter(s => s.id !== updatedSession.id)]);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
      
      toast({
        title: 'Error',
        description: 'There was an error processing your message. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // Mock response generator - this would be replaced with actual LLM calls
  const generateMockResponse = (userMessage: string, preferences: UserPreference | null): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Industry-specific response
    if (preferences?.industry) {
      if (lowerCaseMessage.includes('latest trends') || lowerCaseMessage.includes('recent trends')) {
        return `Based on recent analyses of the ${preferences.industry} industry, there are three key emerging trends:\n\n1. **Increased focus on sustainability**: Companies are emphasizing eco-friendly practices and transparent supply chains.\n\n2. **Digital transformation acceleration**: More businesses are investing in AI and automation to streamline operations.\n\n3. **Customer experience personalization**: Brands are leveraging data to create highly personalized user journeys.\n\nWould you like me to explore any of these trends in more detail?`;
      }
    }
    
    // Audience-specific response
    if (preferences?.targetAudience && lowerCaseMessage.includes('audience')) {
      return `For your target audience of ${preferences.targetAudience}, recent data suggests a growing interest in video content and interactive experiences. Engagement metrics across social platforms show a 34% increase in video consumption compared to static content. Additionally, there's a trend toward community-based content that fosters discussion rather than passive consumption.`;
    }
    
    // General responses
    if (lowerCaseMessage.includes('digital marketing')) {
      return "Based on my analysis of recent news articles and industry reports, the most discussed digital marketing topics currently are:\n\n1. **AI-driven content creation** - The use of generative AI tools for creating marketing materials\n\n2. **Zero-party data strategies** - Collecting data directly from consumers with consent\n\n3. **Social commerce integration** - Seamless shopping experiences within social media platforms\n\n4. **Sustainability messaging** - How brands communicate their environmental initiatives\n\nWould you like me to provide more details on any of these topics?";
    }
    
    if (lowerCaseMessage.includes('social media trend')) {
      return "The social media trends with the most staying power according to my analysis are:\n\n1. **Short-form video content** - TikTok-style videos continue to dominate engagement metrics\n\n2. **Creator economy tools** - Platforms are expanding monetization options for content creators\n\n3. **AR/VR experiences** - Augmented reality filters and virtual experiences are gaining traction\n\nCompared to last quarter, short-form video has maintained its position while AR/VR experiences have seen a 27% increase in adoption across platforms.";
    }
    
    if (lowerCaseMessage.includes('thought leader')) {
      return "Recent statements from industry thought leaders indicate a shift in content strategy best practices. Mark Schaefer emphasized the 'Content Shock' concept is accelerating, suggesting that focusing on distinctive content in narrower niches is more effective than broad content marketing. Ann Handley has been advocating for 'slower' content - fewer pieces with higher quality and depth. Meanwhile, Jay Baer continues to promote the idea that the best content answers specific customer questions.";
    }
    
    // Default response
    return "Based on current trend analysis, I'm seeing significant movement in a few key areas. Digital transformation initiatives are accelerating across industries, with particular focus on AI implementation and automation. Content strategies are shifting toward more authentic, value-driven approaches rather than purely promotional content. Would you like me to focus on a specific industry or trend category for more detailed insights?";
  };

  return (
    <ChatContext.Provider
      value={{
        currentSession,
        sessions,
        userPreferences,
        loading,
        sendMessage,
        startNewSession,
        loadSession,
        clearSession,
        updateUserPreferences
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
