import { create } from "zustand"; //redux//provider

const useEditpostStore = create((set) => ({
  tags: [],
  addTag: (id) =>
    set((state) => ({
      tags: [...state.tags, id],
    })),
  removeTag: (id) =>
    set((state) => ({
      tags: state.tags.filter((item) => item !== id),
    })),
    setTags:(tags)=>set({tags})

}));

export default useEditpostStore;

// state.notifications.filter((item) => item.id !== notification.id)
