import { deleteDoc, doc } from "firebase/firestore";
import useAuthStore from "../store/authStore"
import { firestore } from "../Firebase/Firebase";
import usePostStore from "../store/postStore";

const useDeletePost = () => {
    // const user = useAuthStore(s=>s.user);
    const deletePostFromLocal = usePostStore(s=>s.deletePost)
    const deletePost = async({post})=>{
        try{
            const postRef = doc(firestore,"posts",post.id);
            await deleteDoc(postRef);
            deletePostFromLocal(post.id);
        }catch(e){
            console.log(e)
        }
    }
  return {deletePost}
}

export default useDeletePost
