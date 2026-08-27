import { create } from 'zustand';

export interface Tab {
  id: string;
  type: 'terminal' | 'editor' | 'dashboard' | 'sftp';
  title: string;
  path?: string; // For editors or sftp
}

export interface Session {
  vpsId: string;
  tabs: Tab[];
  activeTabId: string | null;
}

interface SessionState {
  sessions: Record<string, Session>;
  initSession: (vpsId: string) => void;
  addTab: (vpsId: string, tab: Tab) => void;
  removeTab: (vpsId: string, tabId: string) => void;
  setActiveTab: (vpsId: string, tabId: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessions: {},
  
  initSession: (vpsId) => set((state) => {
    if (state.sessions[vpsId]) return state; // already initialized
    const defaultTab: Tab = { id: crypto.randomUUID(), type: 'terminal', title: 'Terminal 1' };
    return {
      sessions: {
        ...state.sessions,
        [vpsId]: {
          vpsId,
          tabs: [defaultTab],
          activeTabId: defaultTab.id,
        }
      }
    };
  }),

  addTab: (vpsId, tab) => set((state) => {
    const session = state.sessions[vpsId];
    if (!session) return state;
    return {
      sessions: {
        ...state.sessions,
        [vpsId]: {
          ...session,
          tabs: [...session.tabs, tab],
          activeTabId: tab.id,
        }
      }
    };
  }),

  removeTab: (vpsId, tabId) => set((state) => {
    const session = state.sessions[vpsId];
    if (!session) return state;
    const newTabs = session.tabs.filter(t => t.id !== tabId);
    let newActiveId = session.activeTabId;
    if (newActiveId === tabId) {
      newActiveId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
    }
    return {
      sessions: {
        ...state.sessions,
        [vpsId]: {
          ...session,
          tabs: newTabs,
          activeTabId: newActiveId,
        }
      }
    };
  }),

  setActiveTab: (vpsId, tabId) => set((state) => {
    const session = state.sessions[vpsId];
    if (!session) return state;
    return {
      sessions: {
        ...state.sessions,
        [vpsId]: {
          ...session,
          activeTabId: tabId,
        }
      }
    };
  }),
}));
