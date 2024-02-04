import { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { firestore } from "../Firebase/Firebase";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "in", authUser.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        let resPosts = [];
        let comments = [];
        let replies = [];
        for (let post of feedPosts) {
          const subCollectionRef = collection(
            firestore,
            "posts",
            post.id,
            "comments"
          );
          const querySubCollection = query(subCollectionRef);
          const querySnapshotSubCollection = await getDocs(querySubCollection);
          querySnapshotSubCollection.forEach((doc) => {
            comments.push({
              comment: { ...doc.data(), id: doc.id },
              replies: [],
            });
          });
		  resPosts.push({ post: post, comments: comments });
          comments = [];
        }

        setPosts(resPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPosts, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
