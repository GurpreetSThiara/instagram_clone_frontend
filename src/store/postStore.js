import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  savedPosts: [],
  savedPostsList: [],
  isReplyingComment: false,
  replyingTo: null,
  comment: null,

  setIsReplyingComment: (isReplyingComment) => set({ isReplyingComment }),
  setReplyingTo: (replyingTo) => set({ replyingTo }),
  setComment: (comment) => set({ comment }),
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setPosts: (posts) => set({ posts }),
  setSavedPosts: (savedPosts) =>
    set((state) => ({
      savedPosts: [...state.savedPosts, savedPosts],
    })),
  setSavedPostsList: (savedPosts) =>
    set((state) => {
      console.log("oooooooooooooooooooooooooooooooooo");
      if (state.savedPostsList.includes(savedPosts)) {
        return { savedPostsList: state.savedPostsList }; // Return the existing state
      }
      return { savedPostsList: [...state.savedPostsList, savedPosts] }; // Return the updated state
    }),

  // addComment: (postId, comment) =>
  //   set((state) => ({
  //     posts: state.posts.map((post) => {
  //       if (post.post.id === postId) {
  //         return {
  //           ...post,
  //           comments: [...post.comments.comment, comment],
  //         };
  //       }
  //       return post;
  //     }),
  //   })),
  //   addComment: (postId, comment) =>
  //   set((state) => ({
  //     posts: state.posts.map((post) => {
  //       if (post.post.id === postId) {
  //         return {
  //           ...post,
  //           comments: {
  //             comment: [...post.comments.comment, comment],
  //             replies: [...post.comments.replies], // Keeping existing replies unchanged
  //           },
  //         };
  //       }
  //       return post;
  //     }),
  //   })),

  //   updateLikes: (postId, comment, commentObject) =>
  //     set((state) => ({
  //       posts: state.posts.map((post) => {
  //         if (post.post.id === postId) {
  //           const updatedComments = post.comments.comment.map((existingComment) => {

  //             if (existingComment.id === comment.id) {

  //               return { ...existingComment, ...commentObject };
  //             }
  //             return existingComment;
  //           });

  //           return {
  //             ...post,
  //             comments: updatedComments,
  //           };
  //         }
  //         return post;
  //       }),
  //     })),
  // }));
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { comment: comment, replies: [] }],
            // comments: {
            //   comment: [...post.comments.comment, comment],
            //   replies: [...post.comments.replies], // Keeping existing replies unchanged
            // },
          };
        }
        return post;
      }),
    })),
  addReplyToComment: (postId, commentId, reply_res) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");

        if (post.post.id === postId) {
          const updatedComments = post.comments.map((item) => {
            if (item.comment.id === commentId) {
              return { comment: { ...item.comment }, replies: [...reply_res] };
            }
            return item;
          });
          console.log("postpostpost");
          console.log({
            ...post,
            comments: [...updatedComments],
          });
          return {
            ...post,
            comments: [...updatedComments],
          };
        }
        console.log("postpostpost");
        console.log(post);
        return post;
      }),
    })),

  updateLikes: (postId, comment, commentObject) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.post.id === postId) {
          const updatedComments = post.comments.map((item) => {
            if (item.comment.id === comment.id) {
              return {
                comment: { ...item.comment, ...commentObject },
                replies: [...item.replies],
              };
            }

            return item;
          });

          console.log("ittttttteeeeeeemmmmmm");
          console.log(updatedComments);

          return {
            ...post,
            comments: [...updatedComments],
          };
        }
        return post;
      }),
    })),

    updateReplyLikes: (reply , commentId) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.post.id === reply.postId) {
          const updatedComments = post.comments.map((item) => {
            if (item.comment.id === commentId) {
              return {
                comment: { ...item.comment },
                replies: item.replies.map((r)=>{
                  if(r.id === reply.id){
                    return reply;
                  }
                  return r;
                }),
              };
            }

            return item;
          });

          console.log("ittttttteeeeeeemmmmmm");
          console.log(updatedComments);

          return {
            ...post,
            comments: [...updatedComments],
          };
        }
        return post;
      }),
    })),  

  updateNumberOfReplies: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.post.id === postId) {
          const updatedComments = post.comments.map((item) => {
            if (item.comment.id === comment.id) {
              return {
                comment: {
                  ...item.comment,
                  numberOfReplies: comment.numberOfReplies + 1,
                },
                replies: [...item.replies],
              };
            }

            return item;
          });

          return {
            ...post,
            comments: [...updatedComments],
          };
        }
        return post;
      }),
    })),
}));

export default usePostStore;
