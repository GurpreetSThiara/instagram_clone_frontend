import { useEffect, useState } from "react";

import { collection, doc, getDocs, query, where } from "firebase/firestore";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { firestore } from "../Firebase/Firebase";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);
      const mainCollectionRef = collection(firestore, "posts");

      try {
        const q = query(
          mainCollectionRef,
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        let resPosts = [];
        let comments = [];
        let replies = [];
        for (let post of posts) {
          const subCollectionRef = collection(firestore, "posts", post.id, "comments");
          const querySubCollection = query(subCollectionRef);
          const querySnapshotSubCollection = await getDocs(querySubCollection);
          querySnapshotSubCollection.forEach((doc) => {
            comments.push({comment:{ ...doc.data(), id: doc.id},replies:[] });
          });
		  
          resPosts.push({ post: post, comments: {comment:comments} });
          comments = [];
        }
        setPosts(resPosts);
        console.log(resPosts);
        console.log("ppppppppppppppppppppppppp");

        // setPosts(posts);
	
      } catch (error) {
        showToast("Error", error.message, "error");
		
        setPosts([]);
      } finally {

	  setIsLoading(false);
      }
    };

    getPosts();
  }, [setPosts, userProfile, showToast]);

  return { isLoading };
};

export default useGetUserPosts;
