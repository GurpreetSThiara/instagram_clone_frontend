import { doc, updateDoc } from "firebase/firestore";
import useNotifications from "./useNotifications";
import { firestore } from "../Firebase/Firebase";

const useUpdatePost = () => {
  const { notifyTag } = useNotifications();
  const updatePost = async ({ post, tagsToBeRemoved, newTags }) => {

    console.log("removed:")
    console.log(tagsToBeRemoved)
    try {
      const postRef = doc(firestore, "posts", post.id);
      await updateDoc(postRef, post);
      for (let i of newTags) {
        const userRef = doc(firestore, "users", i.uid);
        const user = {
          ...i,
          tags: i.tags ? [...i.tags, post.id] : [post.id],
        };
        await updateDoc(userRef, user);
        notifyTag({ postId: post.id, postOwnerId: post.createdBy,userId:i.uid });
      }
      if (tagsToBeRemoved.length > 0) {
        for (let i of tagsToBeRemoved) {
          const updatedTags = i.tags.filter((tag) => tag !== post.id);
          const userRef = doc(firestore, "users", i.uid);
          const user = {
            ...i,
            tags: updatedTags,
          };
          await updateDoc(userRef, user);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { updatePost };
};

export default useUpdatePost;
