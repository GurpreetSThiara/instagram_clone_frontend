
import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotifications: () => set(() => ({ notifications: [] })),
  deleteNotificationFromLocal: (notification) => set((state) => ({
    notifications: state.notifications.filter((item) => item.id !== notification.id)
  })),
}));

export default useNotificationStore;
