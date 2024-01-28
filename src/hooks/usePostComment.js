import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

import usePostStore from "../store/postStore";
import { firestore } from "../Firebase/Firebase";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const addReplyToComment = usePostStore((state) => state.addReplyToComment);
  const updateLikes = usePostStore((state) => state.updateLikes);
  const updateNumberOfReplies = usePostStore(
    (state) => state.updateNumberOfReplies
  );

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to comment", "error");
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
      numberOfReplies: 0,
    };

    try {
      const postRef = doc(firestore, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");
      const newCommentRef = await addDoc(commentsCollectionRef, newComment);

      // await updateDoc(commentsCollectionRef, {
      // 	comments: arrayUnion(newComment),
      // });
      addComment(postId, { ...newComment, id: newCommentRef.id });
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleUpdateComment = async (
    createdBy,
    postId,
    commentId,
    commentObject,
    comment
  ) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to comment", "error");
    setIsCommenting(true);

    try {
      console.log("iiiiiiiidddddddddd");
      console.log(commentId);
      const postRef = doc(firestore, "posts", postId, "comments", commentId);

      await updateDoc(postRef, commentObject);
      console.log(comment);
      console.log("ccccccccccooooooooooooooommmmmmmmmm");
      updateLikes(postId, comment, commentObject);
      // addComment(postId, newComment);
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error);
      console.log("eeeeeeeeeeeeeeeeeeeeeeeee");
    } finally {
      setIsCommenting(false);
    }
  };
  const handleCommentReply = async (
    postId,

    repliedComment,
    comment
  ) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to comment", "error");
    setIsCommenting(true);

    try {
      console.log("iiiiiiiidddddddddd");
      console.log(comment.id);
      const reply = {
        repliedComment,
        createdAt: Date.now(),
        createdBy: authUser.uid,
        postId,
      };
      const commentRef = doc(
        firestore,
        "posts",
        postId,
        "comments",
        comment.id
      );
      const commentRepliesCollectionRef = collection(
        commentRef,
        "commentReplies"
      );
      const newCommentRef = await addDoc(commentRepliesCollectionRef, reply);

      const reply_res = { ...repliedComment, id: newCommentRef.id };

      await updateDoc(commentRef, {
        ...comment,
        numberOfReplies: comment.numberOfReplies + 1,
      });

      // await addDoc(postRef, commentObject);

      addReplyToComment(postId, comment.id, reply_res);
      updateNumberOfReplies(postId, comment);
      // addComment(postId, newComment);
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error);
      console.log("eeeeeeeeeeeeeeeeeeeeeeeee");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleGetReplies = async()=>{


    try{
      const commentRef = doc(
        firestore,
        "posts",
        postId,
        "comments",
        comment.id,
        "commentReplies"

      );
      const commentRepliesCollectionRef = collection(
        commentRef,
        "commentReplies"
      );
    }
  }

  return {
    isCommenting,
    handlePostComment,
    handleUpdateComment,
    handleCommentReply,
  };
};

export default usePostComment;
