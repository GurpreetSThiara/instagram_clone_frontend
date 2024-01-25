import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setPosts: (posts) => set({ posts }),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),

  updateLikes: (postId, comment, commentObject) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.post.id === postId) {
          const updatedComments = post.comments.map((existingComment) => {
          
            if (existingComment.id === comment.id) {
             
              return { ...existingComment, ...commentObject };
            }
            return existingComment;
          });

          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      }),
    })),
}));

export default usePostStore;
