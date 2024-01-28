import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  isReplyingComment:false,
  replyingTo:null,
  comment:null,

  setIsReplyingComment:(isReplyingComment)=>set({isReplyingComment}),
  setReplyingTo:(replyingTo)=>set({replyingTo}),
  setComment:(comment)=>set({comment}),
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setPosts: (posts) => set({ posts }),
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
        comments:[...post.comments,{comment:comment,replies:[]}]
        // comments: {
        //   comment: [...post.comments.comment, comment],
        //   replies: [...post.comments.replies], // Keeping existing replies unchanged
        // },
      };
    }
    return post;
  }),
})),
addReplyToComment:(postId, commentId, repliedComment)=>set((state)=>({
  posts:state.posts.map((post)=>{
    if(post.post.id === postId){
      const updatedComments = post.comments.map((item)=>{
        if (item.comment.id === commentId) {
         
          return{comment: { ...item.comment } , replies:[...item.replies,...repliedComment]};
         
        }
        return item;
      });
      return {
        ...post,
        comments: [...updatedComments]
      };
    }
    return post;
  })
})),

updateLikes: (postId, comment, commentObject) =>
set((state) => ({
  posts: state.posts.map((post) => {
    if (post.post.id === postId) {
      const updatedComments = post.comments.map((item) => {
        if (item.comment.id === comment.id) {
          console.log( "uuuuuuullllllllllajscjhdvhdbvkvjkfbjvjfsvbsjvbvbkfvbbbbbbbbbbbbbbbbbbbbb")
          console.log( { ...item.comment, ...commentObject })
          return{comment: { ...item.comment, ...commentObject } , replies:[]};
         
        }
       
        return item;
      });

      console.log("ittttttteeeeeeemmmmmm")
      console.log(updatedComments)

      return {
        ...post,
        comments: [...updatedComments]
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
  
          return{comment: { ...item.comment, numberOfReplies:comment.numberOfReplies+1 } , replies:[...item.replies]};
         
        }
       
        return item;
      });



      return {
        ...post,
        comments: [...updatedComments]
      };
    }
    return post;
  }),
})),


}));





export default usePostStore;
