import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"


const useUpdatePost = () => {
    const updatePost = async ({post,tagsToBeRemoved,newTags}) => {
        try{
            const postRef = doc(firestore,"posts",post.id);
            await updateDoc(postRef,post);
            for(let i of newTags){
             

                const userRef = doc(firestore,"users",i.uid);
                const user = {
                    ...i,
                    "tags":i.tags?[...i.tags,post.id]:[post.id]
                }
               await updateDoc(userRef,user);
                
            }
            if(tagsToBeRemoved.length > 0){
                for(let i of tagsToBeRemoved){
                     const updatedTags = i.tags.filter(tag => tag !== post.id);
                    const userRef = doc(firestore,"users",i.uid);
                    const user = {
                        ...i,
                        "tags":updatedTags
                    }
                   await updateDoc(userRef,user);
            }}


        }catch(e){
            console.log(e)
        }
    }
  return {updatePost}
}

export default useUpdatePost
