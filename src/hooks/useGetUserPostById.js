import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc, getDocs, query } from "firebase/firestore";
import usePostStore from "../store/postStore";
import { firestore } from "../Firebase/Firebase";

const useGetUserPostById = (postId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPost, setUserPost] = useState(null);
  const setSavedPostsList = usePostStore((s) => s.setSavedPostsList);
  const [isPostExist , setIsPostExist ] = useState(true);

  const showToast = useShowToast();

useEffect(()=>{
    const getUserPost = async () => {
        setIsLoading(true);
        setUserPost(null);
        try {
          const querySnapshot = await getDoc(doc(firestore, "posts", postId));
          setIsPostExist(querySnapshot.exists());
          
          if (querySnapshot.exists()) {
            setUserPost(querySnapshot.data());
            // setUserProfile(posts);
          }
    
        } catch (error) {
          showToast("Error", error.message, "error");
        } finally {
          setIsLoading(false);
          
        }
       
      };

      getUserPost();
},[])

  return { isLoading, userPost, isPostExist };
};

export default useGetUserPostById;
