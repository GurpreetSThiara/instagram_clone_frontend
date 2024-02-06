import { create } from "zustand"; //redux//provider

const useEditpostStore = create((set) => ({
  tags: [],
  removedTags:[],
  newTags:[],
  addTag: (tag) =>
    set((state) => ({
      tags: [...state.tags, tag.uid],
      newTags:[...state.newTags,tag]
    })),
  removeTag: (tag) =>
    set((state) => ({
      tags: state.tags.filter((item) => item !== tag.uid),
      removedTags:[...state.removedTags,tag]
    })),
    setTags:(tags)=>set({tags})

}));

export default useEditpostStore;

// state.notifications.filter((item) => item.id !== notification.id)
