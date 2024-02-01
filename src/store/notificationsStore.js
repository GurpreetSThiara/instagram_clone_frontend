
import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotifications: () => set(() => ({ notifications: [] })),
}));

export default useNotificationStore;
