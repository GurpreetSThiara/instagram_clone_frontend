import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import {
  Query,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import usePostStore from "../store/postStore";
import { firestore } from "../Firebase/Firebase";
import useNotifications from "./useNotifications";

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);
  const addReplyToComment = usePostStore((state) => state.addReplyToComment);
  const updateLikes = usePostStore((state) => state.updateLikes);
  const updateReplyLikes = usePostStore((state) => state.updateReplyLikes);
  const { notifyComment } = useNotifications();

  const updateNumberOfReplies = usePostStore(
    (state) => state.updateNumberOfReplies
  );

  const handlePostComment = async (postId, comment, postOwnerId) => {
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
      notifyComment({
        commentByUserId: authUser.uid,
        comment: newComment.comment,
        postId: newComment.postId,
        postOwnerId: postOwnerId,
      });

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

      const reply_res = { ...reply, id: newCommentRef.id };


      await updateDoc(commentRef, {
        ...comment,
        numberOfReplies: comment.numberOfReplies + 1,
      });

      handleGetReplies(postId, comment.id);

      // await addDoc(postRef, commentObject);

      // addReplyToComment(postId, comment.id, [reply_res]);
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

  const handleGetReplies = async (postId, commentId) => {
    try {
      const commentRepliesCollectionRef = collection(
        firestore,
        "posts", // Collection: posts
        postId, // Document ID: postId
        "comments", // Collection: comments
        commentId, // Document ID: commentId
        "commentReplies" // Collection: commentReplies
      );
      const q = query(commentRepliesCollectionRef,  orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q );
      const replies = [];
      querySnapshot.forEach((doc) => {
        replies.push({ ...doc.data(), id: doc.id });
      });

      addReplyToComment(postId, commentId, replies);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateReply = async ({
  
    commentId,
    reply,
 
   
  }) => {
    if (isCommenting) return;
    if (!authUser)
      return showToast("Error", "You must be logged in to comment", "error");
    setIsCommenting(true);

    try {
  
      const postRef = doc(
        firestore,
        "posts",
        reply.postId,
        "comments",
        commentId,
        "commentReplies",
        reply.id
      );

      await updateDoc(postRef, reply);
      updateReplyLikes(reply,commentId)   
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error);
      console.log("eeeeeeeeeeeeeeeeeeeeeeeee");
    } finally {
      setIsCommenting(false);
    }
  };

  return {
    isCommenting,
    handlePostComment,
    handleUpdateComment,
    handleCommentReply,
    handleGetReplies,
    handleUpdateReply
  };
};

export default usePostComment;
