import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import { useState } from "react";
import useGetUserPost from "./useGetUserPost";


const useSavedPost =  () => {
    const setSavedPosts = usePostStore(s=>s.setSavedPosts);
    const [isLoading , setLoading] =  useState(false);
    const {  getUserPost , userProfile } = useGetUserPost();

    const savePost = async (userId, postId, isSaving) => {
        setLoading(true);
        const userRef = collection(firestore, "users", userId , "savedPosts");
        // const savedPostsRef = collection(userRef, "savedPosts");
    
    try{
            // Get the document snapshot for the savedPosts
            const q = query(userRef);

            const savedPostsDoc = await getDocs(q);
            console.log(savedPostsDoc.docs);
            console.log("ddddddddddddddddddddd");
           //resolve error here
            if (!savedPostsDoc.empty) {
                // Document exists, update the postIds array
                const currentPostIds = savedPostsDoc.docs[0].data().postIds || [];
                const updatedPostIds =isSaving? [...currentPostIds, postId]:currentPostIds.includes(postId)?  currentPostIds.filter(postId => postId !== postId):currentPostIds;

        
                // Update the document with the new postIds array
                await updateDoc(savedPostsDoc.docs[0].ref, {
                    postIds: updatedPostIds,
                });


                setSavedPosts(postId);
        
                console.log(`Post with ID ${postId} saved for user ${userId}`);
            } else {

                // Document doesn't exist, create a new one
                await addDoc(userRef, {
                    postIds: [postId],
                });

                setSavedPosts(postId);

        
            }
    }catch(e){
        console.log(e.message)
    }finally{
        setLoading(false);
    }
    };

    const getSavedPosts = async (userId ,getPostsById )=>{
        setLoading(true);
        const ref = collection(firestore, "users", userId ,"savedPosts");

        try{
            const querySnapshot = await getDocs(ref);

            const posts = [];
            
            // const querySnapshot = savedPostsDoc.data().postIds;
            if (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    posts.push( ...doc.data().postIds
                    );
                  });
                  console.log(posts)
                  console.log("postsssssssssssssss")

                  if(getPostsById){
                    for(let id of posts){
                        console.log("id")

                    

                   let x=   await  getUserPost(id);
                    }
                  }  
               
         
            }


        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }
    

  return {savePost , getSavedPosts, isLoading}
}

export default useSavedPost
