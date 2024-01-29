import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useGetUserPost = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState(null);
    const setSavedPostsList = usePostStore(s=>s.setSavedPostsList);

	const showToast = useShowToast();

    const getUserPost = async ({postId}) => {
        setIsLoading(true);
        setUserProfile(null);
        const posts = [];
        try {
            const querySnapshot = await getDocs(doc(firestore, "posts", postId));
            if (querySnapshot.exists()) {
                querySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data(), id: doc.id });
                  });
                setUserProfile(posts);
                setSavedPostsList(posts);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };



	return { isLoading, getUserPost , userProfile };
};

export default useGetUserPost;