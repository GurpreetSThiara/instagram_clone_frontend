import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useGetUserPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const setSavedPostsList = usePostStore((s) => s.setSavedPostsList);

  const showToast = useShowToast();

  const getUserPost = async ({postId,isSavedPostsFetching}) => {
    setIsLoading(true);
    setUserProfile(null);
    try {
      const querySnapshot = await getDoc(doc(firestore, "posts", postId));
      if (querySnapshot.exists()) {
   
        isSavedPostsFetching?  setSavedPostsList({post:querySnapshot.data(),comments:[]}):null;
      }

    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
      
    }
    return 1;
  };

  return { isLoading, getUserPost, userProfile };
};

export default useGetUserPost;
