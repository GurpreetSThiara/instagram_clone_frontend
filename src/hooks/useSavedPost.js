import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import { useState } from "react";


const useSavedPost =  () => {
    const setSavedPosts = usePostStore(s=>s.setSavedPosts);
    const [isLoading , setLoading] =  useState(false);
    const savePost = async (userId, postId) => {
        setLoading(true);
        const userRef = doc(firestore, "users", userId);
        const savedPostsRef = collection(userRef, "savedPosts");
    
    try{
            // Get the document snapshot for the savedPosts
            const savedPostsDoc = await getDoc(savedPostsRef);
    
            if (savedPostsDoc) {
                // Document exists, update the postIds array
                const currentPostIds = savedPostsDoc.data().postIds || [];
                const updatedPostIds = [...currentPostIds, postId];
        
                // Update the document with the new postIds array
                await updateDoc(savedPostsRef, {
                    postIds: updatedPostIds,
                });

                setSavedPosts(postId);
        
                console.log(`Post with ID ${postId} saved for user ${userId}`);
            } else {
                // Document doesn't exist, create a new one
                await setDoc(savedPostsRef, {
                    postIds: [postId],
                });
                setSavedPosts(postId);

        
            }
    }catch(e){
        console.log(e)
    }finally{
        setLoading(false);
    }
    };
    

  return {savePost , isLoading}
}

export default useSavedPost
