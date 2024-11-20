import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, CoachingTopic } from '../types/coaching';

interface Session {
  id: string;
  startTime: string;
  messages: Message[];
  topicId?: string;
}

interface ChatState {
  messages: Message[];
  selectedTopic: CoachingTopic | null;
  sessions: Session[];
  currentSessionId: string | null;
  addMessage: (message: Message) => void;
  clearChat: () => void;
  setSelectedTopic: (topic: CoachingTopic | null) => void;
  startNewSession: () => void;
  downloadSession: (sessionId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      selectedTopic: null,
      sessions: [],
      currentSessionId: null,
      addMessage: (message) => {
        set((state) => {
          const newMessages = [...state.messages, message];
          const updatedSessions = state.sessions.map(session => 
            session.id === state.currentSessionId 
              ? { ...session, messages: newMessages }
              : session
          );
          return {
            messages: newMessages,
            sessions: updatedSessions,
          };
        });
      },
      clearChat: () => set({ messages: [] }),
      setSelectedTopic: (topic) => set({ selectedTopic: topic }),
      startNewSession: () => {
        const { messages, selectedTopic, sessions } = get();
        if (messages.length > 0) {
          const newSessions = [...sessions];
          if (get().currentSessionId) {
            // Save current session
            const currentSession = {
              id: get().currentSessionId,
              startTime: new Date().toISOString(),
              messages,
              topicId: selectedTopic?.id,
            };
            const existingIndex = newSessions.findIndex(s => s.id === currentSession.id);
            if (existingIndex >= 0) {
              newSessions[existingIndex] = currentSession;
            } else {
              newSessions.push(currentSession);
            }
          }
          set({
            sessions: newSessions,
            messages: [],
            selectedTopic: null,
            currentSessionId: crypto.randomUUID(),
          });
        } else {
          set({
            currentSessionId: crypto.randomUUID(),
          });
        }
      },
      downloadSession: (sessionId) => {
        const { sessions } = get();
        const session = sessions.find(s => s.id === sessionId);
        if (session) {
          const blob = new Blob([JSON.stringify(session, null, 2)], {
            type: 'application/json',
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `coaching-session-${new Date(session.startTime).toISOString().split('T')[0]}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);