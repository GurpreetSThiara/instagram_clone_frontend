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
  const updateLikes = usePostStore((state) => state.updateLikes);

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
    };

    try {
      const postRef = doc(firestore, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");
      const newCommentRef = await addDoc(commentsCollectionRef, newComment);

      // await updateDoc(commentsCollectionRef, {
      // 	comments: arrayUnion(newComment),
      // });
      addComment(postId, newComment);
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

  return { isCommenting, handlePostComment, handleUpdateComment };
};

export default usePostComment;
