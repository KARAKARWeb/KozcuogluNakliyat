// Global State Management - Zustand Store

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// UI State Slice
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

// Auth State Slice
interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  logout: () => void;
}

// Notification State Slice
interface NotificationState {
  notifications: any[];
  unreadCount: number;
  addNotification: (notification: any) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

// Combined Store Type
interface AppStore extends UIState, AuthState, NotificationState {}

// Create Store
export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      // UI State
      sidebarOpen: true,
      theme: 'system',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),

      // Auth State
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Notification State
      notifications: [],
      unreadCount: 0,
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),
      clearAll: () => set({ notifications: [], unreadCount: 0 }),
    }),
    {
      name: 'kozcuoglu-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

// Selectors
export const useUI = () => useStore((state) => ({
  sidebarOpen: state.sidebarOpen,
  theme: state.theme,
  toggleSidebar: state.toggleSidebar,
  setTheme: state.setTheme,
}));

export const useAuth = () => useStore((state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  setUser: state.setUser,
  logout: state.logout,
}));

export const useNotifications = () => useStore((state) => ({
  notifications: state.notifications,
  unreadCount: state.unreadCount,
  addNotification: state.addNotification,
  markAsRead: state.markAsRead,
  clearAll: state.clearAll,
}));
